import { SidebarHeader } from "./components/sidebar-header";
import { SidebarNavigation } from "./components/sidebar-navigation";
import { UpgradeCard } from "./components/upgrade-card";

export const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <SidebarHeader />
        <SidebarNavigation />
        <UpgradeCard />
      </div>
    </div>
  );
};
