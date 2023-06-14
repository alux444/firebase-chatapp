import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CurrentRoomContext } from "../../App";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

const ChatNav = () => {
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
  const [roomList, setRoomList] = useState([]);
  const roomsRef = collection(db, "activerooms");

  useEffect(() => {
    const rooms = [];

    const unsubscribe = onSnapshot(
      query(roomsRef, orderBy("time", "asc")),
      (querySnapshot) => {
        const newRooms = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        newRooms.map((room) => {
          rooms.push({ name: room.name, privacy: room.privacy });
        });
        setRoomList(rooms);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const otherRooms = roomList.map((room) => {
    return (
      <button
        key={room.name}
        style={{
          margin: "5px",
          borderColor: currentRoom === room.name ? "red" : "",
        }}
        onClick={() => setCurrentRoom(room.name)}
      >
        Join {room.name}
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
    </Box>
  );
};

export default ChatNav;
