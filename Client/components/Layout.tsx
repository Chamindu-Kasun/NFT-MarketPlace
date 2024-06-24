import React, { useState } from "react";
import { useMode } from "../context/modeContext";
import { useRouter } from "next/router";

import Footer from "./Footer";
import TopNavBar from "./TopNavBar";

type LayoutProps = {
  children: React.ReactNode;
};

//layout component
//use to render reusable components
//use to handle light and dark mode
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mode } = useMode();
  //check if the user is in /user page
  const router = useRouter();
  const isUserPage = router.pathname === "/user";

  return (
    <div className={`background-${mode}`}>
      {!isUserPage && <TopNavBar />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
