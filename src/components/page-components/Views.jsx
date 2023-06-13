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
    if (user.username && pathname === "/firebase-chatapp/") {
      navigate("/firebase-chatapp/home");
    }

    if (!user.username && pathname === "/firebase-chatapp/home") {
      navigate("/firebase-chatapp/");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/firebase-chatapp/" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/firebase-chatapp/about" element={<About />} />
      <Route path="/firebase-chatapp/home" element={<Home />} />
    </Routes>
  );
};

export default Views;
