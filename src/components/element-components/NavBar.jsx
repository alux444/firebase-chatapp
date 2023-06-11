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
      <Link to="/" className={`${isActive("/")}${isActive("/home")}`}>
        Home
      </Link>
      <Link to="/about" className={isActive("/about")}>
        About
      </Link>
    </div>
  );
};

export default NavBar;
