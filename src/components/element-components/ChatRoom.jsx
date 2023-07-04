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
        <Box
          sx={{
            width: "100%",
            height: "15%",
            border: "1px solid white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>Login to chat</p>
          <Link to="/firebase-chatapp/">
            <button>Login Page</button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default ChatRoom;
