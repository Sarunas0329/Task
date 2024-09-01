import React from "react";
import AppBarMenu from "./AppBarMenu";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBarMenu />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
