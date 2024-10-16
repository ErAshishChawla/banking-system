"use client";

import { LuLogOut } from "react-icons/lu";

import { useModalStore } from "@/lib/zustand/store-providers/modal-store-provider";

import { ModalTypes } from "@/lib/zustand/stores/modal-store";

interface FooterProps {
  user: User;
}

function SignoutFooter({ user }: FooterProps) {
  const { onOpen } = useModalStore((s) => s);
  const handleSignoutClick = () => {
    onOpen(ModalTypes.Signout);
  };

  return (
    <footer className="w-full h-full flex cursor-pointer items-center justify-between gap-2 py-6 px-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 items-center justify-center rounded-full bg-gray-200 flex sm:hidden lg:flex">
          <p className="text-xl font-bold text-gray-700">
            {user?.name?.[0] || "G"}
          </p>
        </div>
        <div className="flex-1 flex-col justify-center flex sm:hidden lg:flex min-w-0">
          <h1 className="text-12 truncate font-normal text-gray-600 w-full">
            {user.name}
          </h1>
          <p className="text-12 truncate text-gray-600 font-semibold w-full">
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-fit sm:w-full lg:w-fit">
        <LuLogOut
          className="w-5 h-5 text-gray-400 hover:text-gray-600"
          onClick={handleSignoutClick}
        />
      </div>
    </footer>
  );
}

export default SignoutFooter;
