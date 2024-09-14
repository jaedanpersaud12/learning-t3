# Credit Cloud Project 

# This is just a test project, im learning some of the patterns and best practices used in this stack to get betta.

Our plan is to build Credit Cloud using most of the previous scaffolding but with some minor architectural changes.

**1. Authentication:** We will implement **[Clerk](https://clerk.com/)** for robust authentication. This replaces the current simple Google authentication hooks library used in Credit Cloud. Clerk offers enhanced authentication features and better security, providing a more comprehensive solution for user management and access control.

Here's how we'll use Clerk to protect all connections in and out of the app:

1. **API Route Protection:** We'll use Clerk's middleware to protect our API routes, ensuring only authenticated users can access sensitive endpoints.

   ```typescript
   import { authMiddleware } from "@clerk/nextjs";

   export default authMiddleware({
     publicRoutes: ["/api/public"],
   });

   export const config = {
     matcher: ["/(api|trpc)(.*)"],
   };
   ```

2. **Client-Side Protection:** We'll wrap our pages with Clerk's `<SignedIn>` and `<SignedOut>` components to control access based on authentication status.

   ```jsx
   import { SignedIn, SignedOut } from "@clerk/nextjs";

   export default function ProtectedPage() {
     return (
       <>
         <SignedIn>
           <p>This content is visible only to authenticated users.</p>
         </SignedIn>
         <SignedOut>
           <p>Please sign in to view this content.</p>
         </SignedOut>
       </>
     );
   }
   ```

3. **Server-Side Protection:** For SSR pages, we'll use Clerk's `getAuth()` function to check authentication status and redirect unauthenticated users.

```typescript
const authUser = () => {
  const user = auth();

  if (!user.userId) throw new Error("User not signed in");

  return user;
};
```

```typescript
  const doSomething = async () => {
    const user = authUser();
    if (!user) return;
    else do something
  }
```

4. **Role-Based Access Control (RBAC):** We'll implement custom RBAC using Clerk's user metadata to define and enforce user roles and permissions throughout the app.

5. **Secure Token Handling:** Clerk automatically handles secure token storage and refresh, reducing the risk of token-based attacks.

6. **Multi-Factor Authentication (MFA):** We'll enable Clerk's MFA features for an additional layer of security on sensitive operations.

By implementing Clerk in these ways, we ensure that all connections in and out of our app are protected, providing a robust and secure authentication system throughout the entire application.

**2. Database:** For our database solution, we will continue using **Prisma** as our ORM (Object-Relational Mapping) tool and **Neon** as our serverless Postgres database. We are retaining these technologies for several reasons:

1. Familiarity: Our team has experience working with both Prisma and Neon, which will streamline development and troubleshooting.
2. Established Technologies: Both Prisma and Neon are well-established in the industry, offering robust features and reliable performance.
3. Scalability: Neon's serverless architecture allows for easy scaling as our project grows.
4. TypeScript Integration: Prisma's strong TypeScript support aligns well with our development practices.
5. Developer Experience: The combination of Prisma's intuitive API and Neon's simplified database management enhances our overall developer experience.

**3. File Storage:**
We will use **UploadThing** for file storage, replacing the current Google storage bucket used in Credit Cloud. UploadThing offers several advantages:

- More user-friendly API with clear definition of different upload types
- Seamless integration with modern web frameworks, especially Next.js
- Simplifies the process of uploading and retrieving files
- Allows custom server-side logic after successful uploads
- Supports middleware for authentication and permission checks
- Provides TypeScript support for better type safety
- Offers fine-grained control over file types and sizes
- Free tier provides ample storage for our needs

Implementation example:

- We can define specific upload routes (e.g., `kycIdUploader`, `proofOfAddressUploader`)
- Each route can have its own file type and size restrictions
- Middleware can be used to check user authentication and authorization
- After successful upload, we can perform custom actions like updating our database
- The client-side receives a response after the upload and server-side processing

This change will enhance our file handling capabilities, improve security, and allow for more complex post-upload workflows while maintaining a cost-effective solution.

## Data Fetching & Data Manipulation

Currently, we use Apollo Client connected to a Hasura GraphQL Engine for data fetching. We use codegen to generate typesafe hooks and mutations. While this approach works well, there are some pain points we can address with a more robust data fetching and manipulation library.

For querying data, we will directly use server queries in our React Query hooks, leveraging Next.js 13+ server components. This approach eliminates the need for API routes for read operations, making our data fetching more efficient. We'll only use API routes for mutations.

Here's how we'll implement this:

1. Server Query:
   We'll define our server query in `/src/server/queries.ts`:

```typescript
import "server-only";
import { prisma } from "@/lib/prisma";

export const getAllLoanApplications = async () => {
  const loanApplications = await prisma.loan_applications.findMany({
    orderBy: {
      application_date: "desc",
    },
    include: {
      loan_types: true,
      applicant: {
        select: {
          display_name: true,
          email: true,
        },
      },
    },
  });

  return loanApplications.length ? loanApplications : [];
};
```

2. React Query Hook:
   We'll create a custom hook using React Query to directly call our server query. This will be in `/src/hooks/useLoanApplications.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { getAllLoanApplications } from "@/server/queries";

export function useLoanApplications() {
  return useQuery({
    queryKey: ["loanApplications", "all"],
    queryFn: getAllLoanApplications,
  });
}
```

In this implementation:

1. The server query `getAllLoanApplications` remains a standalone function that interacts directly with the database using Prisma.

2. The client query hook `useLoanApplications` uses React Query's `useQuery` hook to fetch the data. It directly calls our server query function.

3. We've set the `queryKey` to `['loanApplications', 'all']`. This key is used by React Query for caching.

4. The `queryFn` is simply our `getAllLoanApplications` function. React Query will handle calling this function and managing the result.

You can use this hook in your components like this:

```tsx
import { useLoanApplications } from "@/hooks/useLoanApplications";

export default function LoanApplicationsList() {
  const { data: loanApplications, isLoading, error } = useLoanApplications();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {loanApplications.map((app) => (
        <li key={app.id}>
          {app.id} - {app.status} - {app.applicant.display_name}
        </li>
      ))}
    </ul>
  );
}
```

## Comparison with Previous GraphQL/Apollo Client Pattern

Our new approach using React Query with direct server queries is similar in many ways to our previous GraphQL/Apollo Client pattern, but with some key differences and benefits:

### Similarities

1. **Declarative Data Fetching**: Both approaches allow us to declare our data requirements in a clear, readable manner.
2. **Caching**: Both React Query and Apollo Client provide robust caching mechanisms out of the box.
3. **Loading and Error States**: Both libraries offer easy ways to handle loading and error states in our components.
4. **Automatic Re-fetching**: Both solutions can automatically re-fetch data when needed, keeping our UI in sync with our data.

### Benefits of Switching to React Query with Direct Server Queries

1. **Simplified Stack**: By removing GraphQL and Hasura, we've simplified our tech stack. This can lead to easier onboarding for new developers and reduced complexity in our system.

2. **Direct Database Access**: With our new approach, we have direct control over our database queries through Prisma. This allows for more fine-grained optimization and can potentially improve performance.

3. **Type Safety**: While GraphQL also provides type safety, our new setup with TypeScript and Prisma offers end-to-end type safety without the need for a separate schema definition language.

4. **Flexible Data Transformations**: We can easily transform our data on the server before sending it to the client, which can be more efficient than relying on GraphQL resolvers.

5. **Reduced Bundle Size**: React Query is generally lighter than Apollo Client, which can lead to smaller bundle sizes and faster load times for our application.

6. **Easier Server-Side Rendering**: Next.js 13+ server components work seamlessly with this pattern, making server-side rendering and data fetching more straightforward.

7. **Simpler Mutations**: While we're not using React Query for mutations (sticking with API routes), when we do need to use it, React Query's mutation API is often considered simpler and more intuitive than Apollo's.

8. **Better Performance for Small to Medium Apps**: For small to medium-sized applications, this pattern can offer better performance as it avoids the overhead of GraphQL processing.

9. **Easier Debugging**: With direct server queries, it's often easier to debug issues as you can directly inspect the SQL queries being generated by Prisma.

10. **More Control**: This pattern gives us more control over our data fetching logic, allowing us to easily implement custom caching strategies, retry logic, or other optimizations as needed.

By adopting this new pattern, we maintain the benefits of declarative, efficient data fetching that we had with GraphQL and Apollo, while simplifying our stack and gaining more direct control over our data access layer. This change aligns well with our use of Next.js and allows us to leverage the full power of server components and server-side rendering.

Certainly. I'll add the example you provided to the documentation. Here's how we can incorporate it:

### Current Approach (GraphQL/Apollo Client with Subscriptions)

To better understand the benefits of our new approach, let's look at how we currently handle data fetching:

```graphql
fragment PartialLoanApplication on loan_applications {
  id
  start_date
  application_date
  principal
  loan_type {
    loan_category {
      name
    }
    loan_name
  }
  applicant {
    display_name
  }
}

subscription GetAllPendingApplications_ {
  loan_applications(
    where: { status: { _eq: "PENDING" } }
    order_by: { application_date: desc }
  ) {
    ...PartialLoanApplication
  }
}
```

```tsx
"use client";
import { useGetAllPendingApplications_Subscription } from "@/generated/graphql";

export default function ApplicationsTable() {
  const { data, loading, error } = useGetAllPendingApplications_Subscription();
  const loanApplications = data?.loan_applications;

  return (
    <div>
      {loading && <LoadingPage />}
      <DataTable
        columns={columns}
        data={loanApplications || []}
        filters={filters}
      />
    </div>
  );
}
```

### New Approach (React Query with Direct Server Queries)

Now, let's compare this with our new approach:

1. Server Query (src/server/queries.ts):

```typescript
import { prisma } from "@/lib/prisma";

export const getPendingLoanApplications = async () => {
  return prisma.loan_applications.findMany({
    where: { status: "PENDING" },
    orderBy: { application_date: "desc" },
    select: {
      id: true,
      start_date: true,
      application_date: true,
      principal: true,
      loan_type: {
        select: {
          loan_category: { select: { name: true } },
          loan_name: true,
        },
      },
      applicant: { select: { display_name: true } },
    },
  });
};
```

2. React Query Hook (src/hooks/useLoanApplications.ts):

```typescript
import { useQuery } from "@tanstack/react-query";
import { getPendingLoanApplications } from "@/server/queries";

export function usePendingLoanApplications() {
  return useQuery({
    queryKey: ["loanApplications", "pending"],
    queryFn: getPendingLoanApplications,
  });
}
```

3. React Component:

```tsx
"use client";

import { usePendingLoanApplications } from "@/hooks/useLoanApplications";

export default function ApplicationsTable() {
  const {
    data: loanApplications,
    isLoading,
    error,
  } = usePendingLoanApplications();

  return (
    <div>
      {isLoading && <LoadingPage />}
      <DataTable
        columns={columns}
        data={loanApplications || []}
        filters={filters}
      />
    </div>
  );
}
```

This example demonstrates how our new approach simplifies the data fetching process while maintaining the same functionality. Key differences include:

1. Centralized codebase: All code is written in TypeScript, following a consistent pattern throughout the application.
2. Simplified data layer: Removal of GraphQL schema and fragments, reducing complexity.
3. Direct database access: Utilization of Prisma for efficient and type-safe database queries.
4. Enhanced React components: Implementation of React Query hooks for streamlined data fetching and state management.
5. Improved type safety: Leveraging Prisma's automatic type inference for better code reliability and developer experience.
6. Reduced boilerplate: Elimination of unnecessary code, leading to a more maintainable codebase.
7. Improved performance: Potential for better application performance due to reduced overhead from GraphQL layer removal.

By comparing these approaches side-by-side, we can see how the new method streamlines our codebase and provides more direct control over our data fetching process.
