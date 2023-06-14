import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CurrentRoomContext } from "../../App";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

const ChatNav = () => {
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "activerooms"), orderBy("timeCreated", "asc")),
      (querySnapshot) => {
        const newRooms = querySnapshot.docs.map((doc) => doc.data().name);
        setRoomList(newRooms);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const otherRooms = roomList.map((room) => {
    return (
      <button
        style={{
          margin: "5px",
          borderColor: currentRoom === room ? "red" : "",
        }}
        onClick={() => setCurrentRoom(room)}
      >
        Join {room}
      </button>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid white",

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
      {otherRooms}
      <p>hello</p>
    </Box>
  );
};

export default ChatNav;
