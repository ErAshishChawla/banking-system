import React from "react";

import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/auth/get-logged-in-user";
import { redirect } from "next/navigation";
import { routes } from "@/constants";
import { getBankAccounts } from "@/lib/actions/user/get-bank-accounts";

interface LayoutProps {
  children: React.ReactNode;
}

async function Layout({ children }: LayoutProps) {
  const user = (await getLoggedInUser()) as User | null;

  if (!user || !user.$id) {
    return redirect(routes.signIn());
  }

  const bankAccountsCountRes = await getBankAccounts({ userId: user?.$id });

  if (!bankAccountsCountRes?.success) {
    return redirect(routes.signIn());
  }

  const bankAccountsCount = bankAccountsCountRes?.data?.count;

  if (!bankAccountsCount) {
    return redirect(routes.signUp());
  }

  return (
    <main className="w-screen h-screen">
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
    </main>
  );
}

export default Layout;
