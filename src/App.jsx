import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./components/page-components/Views";
import NavBar from "./components/element-components/NavBar";
import Footer from "./components/element-components/Footer";

export const UserContext = createContext();
export const ScrollContext = createContext();
export const CurrentRoomContext = createContext();
export const UnlockedRoomsContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    email: "",
  });
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentRoom, setCurrentRoom] = useState("public");
  const [unlockedRooms, setUnlockedRooms] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { username, email } = JSON.parse(loggedInUser);
      setUser({ loggedIn: true, username, email });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ScrollContext.Provider value={{ autoScroll, setAutoScroll }}>
        <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
          <UnlockedRoomsContext.Provider
            value={{ unlockedRooms, setUnlockedRooms }}
          >
            <BrowserRouter>
              <NavBar />
              <Views />
              <Footer />
            </BrowserRouter>
          </UnlockedRoomsContext.Provider>
        </CurrentRoomContext.Provider>
      </ScrollContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
