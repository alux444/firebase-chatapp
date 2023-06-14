import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { CurrentRoomContext, RoomListContext } from "../../App";

const ChatNav = () => {
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
  const { roomList } = useContext(RoomListContext);

  const otherRooms = roomList.slice(1).map((room) => {
    <button
      style={{ margin: "5px", borderColor: currentRoom === room ? "red" : "" }}
      onClick={() => setCurrentRoom(room)}
    >
      Join {room}
    </button>;
  });

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid white",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90vw",
        overflow: "auto",
      }}
    >
      <button
        style={{
          margin: "5px",
          borderColor: currentRoom === "public" ? "red" : "",
        }}
        onClick={() => setCurrentRoom("public")}
      >
        Public Chat
      </button>
      {otherRooms};
    </Box>
  );
};

export default ChatNav;
