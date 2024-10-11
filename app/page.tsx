import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Highlight } from "@/components/ui/hero-highlight";

import { Button } from "@/components/ui/button";

function Page() {
  return (
    <main className="w-screen h-screen">
      <ScrollArea className="w-full h-full product-page__background-gradient">
        <div className="w-full h-screen max-w-7xl px-8 mx-auto py-4">
          <div className="w-full h-full flex flex-col justify-center items-center min-h-fit">
            <div className="w-full max-w-4xl flex flex-col items-center gap-8">
              <div className="flex flex-col gap-8 items-center w-full">
                <div className="flex gap-4 items-center justify-center w-full">
                  <Image
                    width={50}
                    height={50}
                    src="/icons/logo.svg"
                    alt="logo"
                  />
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold w-fit">
                    Horizon Banking
                  </h1>
                </div>

                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center leading-normal">
                  <Highlight>One stop</Highlight> for all banking needs.
                </p>
              </div>

              <div className="w-full flex items-center gap-4 justify-center">
                <Button className="border-neutral-600 text-black bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
                  <Link href="/auth/signin">Sign up</Link>
                </Button>

                <Button className="hover:bg-[rgba(0,118,255,0.9)] bg-[#0070f3] text-white transition-colors">
                  <Link href="/auth/signup">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}

export default Page;
