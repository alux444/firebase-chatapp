import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./components/page-components/Views";
import NavBar from "./components/element-components/NavBar";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false, username: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <NavBar />
        <Views />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
