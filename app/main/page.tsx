import { redirect } from "next/navigation";

import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { getUserData } from "@/lib/actions/user/get-user-data";
import { routes } from "@/constants";
import { getAccount, getAccounts } from "@/lib/actions/bank/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

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
    <section className="w-full h-full flex">
      <div className="flex-1 h-full">
        <ScrollArea className="w-full h-full">
          <div className="w-full flex flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
            <header className="home-header">
              <HeaderBox
                type="greeting"
                title="Welcome"
                user={user?.name || "Guest"}
                subtext="Access and manage your account and transactions efficiently."
              />

              <TotalBalanceBox
                accounts={accounts?.data || []}
                totalBanks={accounts?.totalBanks || 0}
                totalCurrentBalance={accounts?.totalCurrentBalance || 0}
              />
            </header>

            <RecentTransactions
              accounts={accounts?.data || []}
              transactions={account?.transactions}
              appwriteItemId={appwriteItemId}
              page={currentPage}
            />
          </div>
        </ScrollArea>
      </div>
      <div className="w-[355px] h-full hidden xl:block">
        <RightSidebar
          user={user}
          transactions={account?.transactions}
          banks={accounts?.data?.slice(0, 2)}
        />
      </div>
    </section>
  );
}

export default Page;
