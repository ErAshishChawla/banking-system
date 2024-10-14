/* 
This component will render sidebar based on the width of the screen. It will show different sidebar based on the width of the screen.

1. Mobile will show when width is less than 640px.
2. Sidebar will be displayed when width is greater than 640px.
*/

"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";

import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";

function MainNavigation() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  return <>{isMobile ? <MobileNav /> : <SideBar />}</>;
}

export default MainNavigation;
