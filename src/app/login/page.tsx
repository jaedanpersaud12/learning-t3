"use client";
import Link from "next/link";
import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = () => {
  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-primary p-10 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* <Logo width={100} height={50} className="fill-babyBlue" /> */}
            Something
          </div>
          <div className="relative inset-0 mx-auto my-auto max-w-xl text-2xl font-bold">
            <div className="px-8">
              Your Lending Companion & Partner in Innovation
            </div>

            {/* <Image
              src={"/login-graphic.png"}
              width={500}
              height={500}
              alt={""}
            /> */}
          </div>
        </div>
        <div className="">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="absolute right-4 top-4">{/* <ModeToggle /> */}</div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking sign-in, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
