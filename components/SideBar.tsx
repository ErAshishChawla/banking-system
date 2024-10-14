"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

function SideBar() {
  const pathname = usePathname();
  const loggedIn = { firstName: "Ashish", lastName: "Chawla" };

  return (
    <aside className="w-full h-full border-r border-gray-200 bg-white">
      <div className="h-16 flex justify-center items-center px-4 w-full">
        <Link
          className="flex justify-center lg:justify-start items-center w-full gap-2"
          href="/"
        >
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="select-none"
          />
          <div className="font-ibm-plex-serif text-20 font-bold text-black-1 select-none hidden lg:block">
            Horizon
          </div>
        </Link>
      </div>
      <div className="w-full h-[calc(100%_-_8rem)]">
        <ScrollArea className="w-full h-full">
          <div className="w-full h-full flex px-4 flex-col gap-4 pt-12 items-center">
            {sidebarLinks.map(({ route, label, Icon }) => {
              const isActive = pathname === route || pathname.startsWith(route);
              return (
                <Link
                  href={route}
                  key={label}
                  className={cn(
                    "flex gap-3 items-center p-2 md:p-3 2xl:p-4 rounded-lg w-full select-none",
                    isActive && "bg-bank-gradient"
                  )}
                >
                  <div className="flex justify-center items-center">
                    <Icon
                      className={cn(
                        "w-6 h-6 text-gray-400 select-none",
                        isActive && "text-white"
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "text-16 font-semibold text-black-2 select-none hidden lg:block",
                      isActive && "text-white"
                    )}
                  >
                    {label}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="h-16 flex items-center">Out</div>
    </aside>
  );
}

export default SideBar;
