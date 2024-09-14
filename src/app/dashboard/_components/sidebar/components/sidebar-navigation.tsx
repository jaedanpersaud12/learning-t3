import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export const SidebarNavigation = () => {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        {/* Add other navigation links here */}
      </nav>
    </div>
  );
};
