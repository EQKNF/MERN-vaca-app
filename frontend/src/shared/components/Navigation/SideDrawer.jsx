import React from "react";
import reactDom from "react-dom";

import "./SideDrawer.css";

const SideDrawer = ({ drawerIsOpen, children, onClick }) => {
  const content = (
    <aside
      className={`side-drawer ${drawerIsOpen ? " open" : "close"}`}
      onClick={onClick}
    >
      {children}
    </aside>
  );

  return reactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
