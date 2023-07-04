import React, { useContext } from "react";
import ChatRoom from "../element-components/ChatRoom";
import SettingsNav from "../element-components/SettingsNav";
import ChatNav from "../element-components/ChatNav";

const Home = () => {
  return (
    <div>
      <div
        style={{
          width: "85vw",
          justifyContent: "center",
        }}
      >
        <SettingsNav />
        <ChatNav />
        <ChatRoom />
      </div>
    </div>
  );
};

export default Home;
