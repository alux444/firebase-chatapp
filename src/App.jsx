import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./components/page-components/Views";
import NavBar from "./components/element-components/NavBar";
import Footer from "./components/element-components/Footer";

export const UserContext = createContext();
export const ScrollContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    email: "",
  });
  const [autoScroll, setAutoScroll] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ScrollContext.Provider value={{ autoScroll, setAutoScroll }}>
        <BrowserRouter>
          <NavBar />
          <Views />
          <Footer />
        </BrowserRouter>
      </ScrollContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
