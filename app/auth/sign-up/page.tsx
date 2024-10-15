import React from "react";

import SignUpForm from "@/components/ui/SignUpForm";
import { ScrollArea } from "@/components/ui/scroll-area";

function Page() {
  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center items-center px-6">
          <SignUpForm />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
