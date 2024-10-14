/* 
This component renders the main layout of the application. It includes the sidebar, mobile navigation, and the main content area.

1. Mobile will show when width is less than 640px.
2. Sidebar will be short and will show only icons when width is between 640px and 1024px.
3. Sidebar will be long and will show icons and labels when width is greater than 1024px.
*/

import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import MainNavigation from "@/components/MainNavigation";

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
