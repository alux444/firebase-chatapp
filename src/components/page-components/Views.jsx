import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import Home from "./Home";
import { UserContext } from "../../App";

const Views = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (user.loggedIn && pathname === "/") {
      navigate("/home");
    }
  }, [user.loggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Views;
