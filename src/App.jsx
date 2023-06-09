import React, { createContext, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { useContext } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false, username: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Login />
      </div>
    </UserContext.Provider>
  );
}

export default App;
