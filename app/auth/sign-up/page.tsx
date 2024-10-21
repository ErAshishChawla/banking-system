import React from "react";

import SignUpForm from "@/components/ui/SignUpForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLoggedInUser } from "@/lib/actions/auth/get-logged-in-user";

async function Page() {
  const user = (await getLoggedInUser()) as User | null;
  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center items-center px-6">
          <SignUpForm loggedInUser={user} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
