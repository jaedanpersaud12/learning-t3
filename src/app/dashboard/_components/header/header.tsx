import { UserButton } from "@clerk/nextjs";
import { MobileNavToggle, SearchBar } from "./components";

export const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNavToggle />
      <SearchBar />
      <UserButton />
    </header>
  );
};
