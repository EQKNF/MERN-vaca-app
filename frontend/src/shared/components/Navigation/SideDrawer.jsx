import React from "react";
import reactDom from "react-dom";

import "./SideDrawer.css";

const SideDrawer = ({ drawerIsOpen, children }) => {
  const content = (
    <aside className={`side-drawer ${drawerIsOpen ? " open" : "close"}`}>
      {children}
    </aside>
  );

  return reactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
