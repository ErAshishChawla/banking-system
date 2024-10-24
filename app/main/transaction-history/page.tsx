import React from "react";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import HeaderBox from "@/components/HeaderBox";

import { getUserData } from "@/lib/actions/user/get-user-data";
import { getAccount, getAccounts } from "@/lib/actions/bank/bank.actions";
import { routes } from "@/constants";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "@/components/TransactionsTable";

async function Page({ searchParams: { id, page } }: SearchParamProps) {
  const currentPage = Number(page as string) || 1;
  const getUserRes = await getUserData();

  if (!getUserRes?.success) {
    return redirect(routes.signIn());
  }

  const user = getUserRes?.data?.user as User | null;

  if (!user) {
    return redirect(routes.signIn());
  }

  const accounts = await getAccounts({
    userId: user?.$id,
  });

  if (!accounts) {
    return redirect(routes.signIn());
  }

  const appwriteItemId = (id as string) || accounts?.data?.[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="w-full h-full">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full transactions">
          <div className="transactions-header">
            <HeaderBox
              title="Transaction History"
              subtext="See your bank details and transactions"
            />
          </div>

          <div className="space-y-6">
            <div className="transactions-account">
              <div className="flex flex-col gap-2">
                <h2 className="text-18 font-bold text-white">
                  {account?.data?.name}
                </h2>
                <p className="text-14 text-blue-25">
                  {account?.data?.officialName}
                </p>
                <p className="text-10 font-semibold tracking-[1.1px] text-white">
                  &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;
                  &#9679;&#9679;&#9679;&#9679;{" "}
                  <span className="text-16">{account?.data?.mask}</span>
                </p>
              </div>

              <div className="transactions-account-balance">
                <p className="text-14">Current balance</p>
                <p className="text-24 text-center font-bold">
                  {formatAmount(account?.data?.currentBalance)}
                </p>
              </div>
            </div>

            <section className="flex w-full flex-col gap-6">
              <TransactionsTable transactions={account?.transactions} />
            </section>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}

export default Page;
