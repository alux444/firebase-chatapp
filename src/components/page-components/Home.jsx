import React, { useContext } from "react";
import ChatRoom from "../element-components/ChatRoom";
import SettingsNav from "../element-components/SettingsNav";
import ChatNav from "../element-components/ChatNav";
import { UserContext } from "../../App";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div
        style={{
          width: "85vw",
          justifyContent: "center",
        }}
      >
        {user.loggedIn ? (
          <div>
            <SettingsNav />
            <ChatNav />
          </div>
        ) : (
          <div>
            <p>Public Chatroom Preview</p>
            <small>Login to access other rooms.</small>
          </div>
        )}
        <ChatRoom />
      </div>
    </div>
  );
};

export default Home;
