import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import Home from "./Home";

const Views = () => {
  return (
    <Routes>
      <Route path="/firebase-chatapp/" element={<Login />} />
      <Route path="/firebase-chatapp/about" element={<About />} />
      <Route path="/firebase-chatapp/home" element={<Home />} />
    </Routes>
  );
};

export default Views;
