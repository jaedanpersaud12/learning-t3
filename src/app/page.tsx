"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router, isSignedIn]);
}
