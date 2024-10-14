"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

import { RiMenuFill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

function MobileNav() {
  const pathname = usePathname();

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ minWidth: 640 });

  useEffect(() => {
    if (isDesktop) {
      setIsSheetOpen(false);
    }
  }, [isSheetOpen, isDesktop]);

  return (
    <div className="w-full h-full flex items-center justify-between gap-4 px-4">
      <Link className="flex items-center gap-2" href="/">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="select-none"
        />
        <div className="font-ibm-plex-serif text-20 font-bold text-black-1 select-none">
          Horizon
        </div>
      </Link>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <RiMenuFill className="text-black-1/70 size-6 hover:text-black-3 transition-colors" />
        </SheetTrigger>
        <SheetContent className="bg-white p-0" side={"left"}>
          <SheetHeader className="h-16 flex px-4 w-full bg-white">
            <SheetTitle className="w-full h-full flex items-center">
              <Link className="flex items-center gap-2" href="/">
                <Image
                  src="/icons/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="select-none"
                />
                <div className="font-ibm-plex-serif text-20 font-bold text-black-1 select-none">
                  Horizon
                </div>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="w-full h-[calc(100%_-_4rem)]">
            <ScrollArea className="w-full h-[calc(100%_-_4rem)]">
              <div className="w-full h-full flex px-4 flex-col gap-2 pt-12">
                {sidebarLinks.map(({ route, label, Icon }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(route);
                  return (
                    <Link
                      href={route}
                      key={label}
                      className={cn(
                        "flex gap-3 items-center p-4 rounded-lg w-full select-none",
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
                          "text-16 font-semibold text-black-2 select-none",
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
            <div className="h-16 px-4 w-full flex items-center border-t">
              <div>Out</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
