import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? "active" : "";
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        gap: "40px",
        margin: "10px 0px",
      }}
    >
      <Link
        to="/firebase-chatapp/"
        className={`${isActive("/firebase-chatapp/")}${isActive(
          "/firebase-chatapp/home"
        )}`}
      >
        Home
      </Link>
      <Link
        to="/firebase-chatapp/about"
        className={isActive("/firebase-chatapp/about")}
      >
        About
      </Link>
    </div>
  );
};

export default NavBar;
