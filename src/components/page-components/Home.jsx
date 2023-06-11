import React from "react";
import ChatRoom from "../element-components/ChatRoom";
import SettingsNav from "../element-components/SettingsNav";
import ChatNav from "../element-components/ChatNav";

const Home = () => {
  return (
    <div>
      <SettingsNav />
      <ChatNav />
      <ChatRoom />
    </div>
  );
};

export default Home;
