import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function Page() {
  const loggedIn = { firstName: "Ashish" };
  return (
    <section className="w-full h-full">
      <ScrollArea className="w-full h-full px-5 sm:px-8 py-7 lg:py-12">
        <div className="w-full flex flex-col gap-8">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || "Guest"}
              subtext="Access and manage your account and transactions efficiently."
            />

            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
            />
          </header>
        </div>
      </ScrollArea>
    </section>
  );
}

export default Page;
