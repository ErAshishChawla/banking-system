import { redirect } from "next/navigation";

import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getLoggedInUser } from "@/lib/actions/auth/get-logged-in-user";
import { routes } from "@/constants";

async function Page() {
  const user = (await getLoggedInUser()) as User | null;

  if (!user) {
    return redirect(routes.signIn());
  }

  return (
    <section className="w-full h-full flex overflow-x-auto">
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
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}
              />
            </header>

            <div>Recent Transactions</div>
          </div>
        </ScrollArea>
      </div>
      <div className="w-[355px] h-full hidden xl:block">
        <RightSidebar user={user} transactions={[]} banks={[{}, {}]} />
      </div>
    </section>
  );
}

export default Page;
