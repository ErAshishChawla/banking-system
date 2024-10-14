import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <main className="w-screen h-screen">{children}</main>;
}

export default Layout;
