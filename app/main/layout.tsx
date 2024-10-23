import React from "react";
import { redirect } from "next/navigation";

import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";

import { routes } from "@/constants";
import { getBanks } from "@/lib/actions/user/get-banks";
import { getUserData } from "@/lib/actions/user/get-user-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
}

async function Layout({ children }: LayoutProps) {
  const userDataRes = await getUserData();

  if (!userDataRes?.success) {
    return redirect(routes.signIn());
  }

  const user = userDataRes?.data?.user;

  if (!user || !user.$id) {
    return redirect(routes.signIn());
  }

  const bankAccountsCountRes = await getBanks({ userId: user?.$id });

  if (!bankAccountsCountRes?.success) {
    return redirect(routes.signIn());
  }

  const bankAccountsCount = bankAccountsCountRes?.data?.count;

  if (!bankAccountsCount) {
    return redirect(routes.signUp());
  }

  return (
    <main className="w-screen h-screen">
      {/* <ScrollArea className="w-full h-full"> */}
      {/* For Mobile Nav */}
      <div className="block sm:hidden w-full h-full">
        <div className="w-full h-16 shadow-md">
          <MobileNav user={user} />
        </div>
        <div className="w-full h-[calc(100%_-_4rem)]">{children}</div>
      </div>

      {/* For Sidebar */}
      <div className="hidden sm:flex flex-row w-full h-full">
        <div className="sm:w-fit lg:w-[280px]">
          <SideBar user={user} />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
      {/* <ScrollBar orientation="horizontal" />
      </ScrollArea> */}
    </main>
  );
}

export default Layout;
