import { cookies } from "next/headers";

import SignInForm from "@/components/SignInForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLoggedInUser } from "@/lib/actions/auth/get-logged-in-user";

async function Page() {
  return (
    <div className="w-full h-full">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center items-center px-6">
          <SignInForm />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
