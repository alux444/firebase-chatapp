import React from "react";
import { Box } from "@mui/material";
import MessagesArea from "./MessagesArea";
import InputArea from "./InputArea";

const ChatRoom = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        border: "1px solid white",
      }}
    >
      <MessagesArea />
      <InputArea />
    </Box>
  );
};

export default ChatRoom;
