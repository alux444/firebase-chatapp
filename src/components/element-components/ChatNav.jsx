import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CurrentRoomContext, UnlockedRoomsContext } from "../../App";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RefreshIcon from "@mui/icons-material/Refresh";
import PrivateRoomModal from "../action-components/PrivateRoomModal";

const ChatNav = () => {
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
  const { unlockedRooms } = useContext(UnlockedRoomsContext);
  const [roomList, setRoomList] = useState([]);
  const [openPassReq, setOpenPassReq] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState();
  const roomsRef = collection(db, "activerooms");

  const getRooms = async () => {
    const querySnapshot = await getDocs(
      query(roomsRef, orderBy("time", "asc"))
    );

    const newRooms = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const rooms = newRooms.map((room) => ({
      name: room.name,
      privacy: room.privacy,
    }));

    setRoomList(rooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleJoin = (name, privacy) => {
    if (!privacy) {
      setCurrentRoom(name);
    } else {
      if (unlockedRooms.includes(name)) {
        console.log(unlockedRooms);
        setCurrentRoom(name);
      } else {
        setCurrentAttempt(name);
        setOpenPassReq(true);
      }
    }
  };

  const closePasswordModal = () => {
    setOpenPassReq(false);
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
        width: "100%",
        overflow: "auto",
      }}
    >
      <button onClick={() => getRooms()} style={{ margin: "5px" }}>
        <RefreshIcon />
      </button>
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
      <PrivateRoomModal
        open={openPassReq}
        close={closePasswordModal}
        roomName={currentAttempt}
      />
    </Box>
  );
};

export default ChatNav;
