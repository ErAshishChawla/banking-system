import React from "react";
import { redirect } from "next/navigation";

import SignUpForm from "@/components/ui/SignUpForm";
import { ScrollArea } from "@/components/ui/scroll-area";

import { routes } from "@/constants";
import { getUserData } from "@/lib/actions/user/get-user-data";
import { getBankAccounts } from "@/lib/actions/user/get-bank-accounts";

async function Page() {
  const getUserRes = await getUserData();

  const user = getUserRes?.data?.user as User | null;

  let hasBankAccount = false;

  if (user) {
    const bankAccountsCountRes = await getBankAccounts({ userId: user?.$id });

    const bankAccountsCount = bankAccountsCountRes?.data?.count;

    if (bankAccountsCount) {
      hasBankAccount = true;
    }
  }
  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center items-center px-6">
          <SignUpForm loggedInUser={user} hasBankAccount={hasBankAccount} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
