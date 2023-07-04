import React, { useContext } from "react";
import { Box } from "@mui/material";
import MessagesArea from "./MessagesArea";
import InputArea from "./InputArea";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const ChatRoom = () => {
  const { user } = useContext(UserContext);
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        border: "1px solid white",
      }}
    >
      <MessagesArea />
      {user.loggedIn ? (
        <InputArea />
      ) : (
        <div className="">
          <p>Login to chat</p>
          <Link to="/firebase-chatapp/">
            <button>Login Page</button>
          </Link>
        </div>
      )}
    </Box>
  );
};

export default ChatRoom;
