import React from "react";
import { MainContent } from "./_components/main-content";
import { Sidebar } from "./_components/sidebar";
import { Header } from "./_components/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
