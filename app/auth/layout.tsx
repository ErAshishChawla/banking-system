import Image from "next/image";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

async function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen flex justify-between font-inter">
      <div className="h-full flex-1">{children}</div>
      <div className="auth-asset flex-1">
        <div>
          <Image
            src="/icons/auth-image.svg"
            alt="Auth Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}

export default Layout;
