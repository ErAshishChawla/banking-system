import React from "react";
import Link from "next/link";

import { AiOutlinePlus } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import BankCard from "./BankCard";

function RightSidebar({ user, transactions, banks }: RightSidebarProps) {
  return (
    <aside className="w-full h-full flex-col border-l border-gray-200">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full">
          <section className="flex flex-col pb-8">
            <div className="profile-banner" />
            <div className="profile">
              <div className="profile-img">
                <span className="text-5xl font-bold text-blue-500">
                  {user.name?.[0] || "G"}
                </span>
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">
                  {user?.email || "guest@example.com"}
                </p>
              </div>
            </div>
          </section>

          <section className="banks">
            <div className="flex w-full justify-between">
              <h2 className="header-2">My Banks</h2>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex justify-center items-center">
                  <AiOutlinePlus className="w-4 h-4 text-gray-600" />
                </div>
                <h2 className="text-14 font-semibold text-gray-600">
                  Add Bank
                </h2>
              </Link>
            </div>

            {banks?.length > 0 && (
              <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                <div className="relative z-10">
                  <BankCard
                    key={banks[0]?.$id}
                    account={banks[0]}
                    userName={user?.name || "Guest"}
                    showBalance={false}
                  />
                </div>
                {banks[1] && (
                  <div className="absolute right-0 top-8 z-0 w-[90%]">
                    <BankCard
                      key={banks[1]?.$id}
                      account={banks[1]}
                      userName={user?.name || "Guest"}
                      showBalance={false}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </aside>
  );
}

export default RightSidebar;
