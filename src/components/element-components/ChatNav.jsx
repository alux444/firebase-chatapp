import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CurrentRoomContext } from "../../App";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AttemptJoinRoom } from "../action-components/AttemptJoinRoom";

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

  const handleJoin = (name, privacy) => {
    const ableToJoin = AttemptJoinRoom(name, privacy);
    if (ableToJoin) {
      setCurrentRoom(name);
    }
  };

  const otherRooms = roomList.map((room) => {
    return (
      <button
        key={room.name}
        style={{
          margin: "5px",
          borderColor: currentRoom === room.name ? "red" : "",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          handleJoin(room.name, room.privacy);
        }}
      >
        <small>
          Join {room.name}
          {room.privacy ? (
            <LockIcon style={{ fontSize: "inherit" }} />
          ) : (
            <LockOpenIcon style={{ fontSize: "inherit" }} />
          )}
        </small>
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
