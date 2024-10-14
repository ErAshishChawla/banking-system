import React from "react";

import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen">
      {/* For Mobile Nav */}
      <div className="block sm:hidden w-full h-full">
        <div className="w-full h-16 shadow-md">
          <MobileNav />
        </div>
        <div className="w-full h-[calc(100%_-_4rem)]">{children}</div>
      </div>

      {/* For Sidebar */}
      <div className="hidden sm:flex flex-row w-full h-full">
        <div className="sm:w-fit lg:w-[280px]">
          <SideBar />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
