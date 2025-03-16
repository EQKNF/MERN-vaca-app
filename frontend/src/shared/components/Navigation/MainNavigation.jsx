import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerIsVisible(true);
    setDrawerIsOpen(open);
  };

  useEffect(() => {
    if (!drawerIsOpen) {
      const timer = setTimeout(() => setDrawerIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [drawerIsOpen]);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={() => toggleDrawer(false)} />}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => toggleDrawer(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>

      {drawerIsVisible && (
        <SideDrawer drawerIsOpen={drawerIsOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
    </>
  );
};

export default MainNavigation;
