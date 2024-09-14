import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = auth();
  console.log(user);
  return <div>Dashboard</div>;
}
