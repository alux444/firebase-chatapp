import React, { useContext } from "react";
import ChatRoom from "../element-components/ChatRoom";
import SettingsNav from "../element-components/SettingsNav";
import ChatNav from "../element-components/ChatNav";
import { UserContext } from "../../App";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.loggedIn ? (
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
      ) : (
        <p>Please login to access chatroom</p>
      )}
    </div>
  );
};

export default Home;
