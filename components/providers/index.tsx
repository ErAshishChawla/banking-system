"use client";

import React from "react";

import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/ModalProvider";

import { ModalStoreProvider } from "@/lib/zustand/store-providers/modal-store-provider";

interface IndexProps {
  children: React.ReactNode;
}

function Providers({ children }: IndexProps) {
  return (
    <>
      <ModalStoreProvider>
        {children}
        <ModalProvider />
        <Toaster />
      </ModalStoreProvider>
    </>
  );
}

export default Providers;
