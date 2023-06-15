import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { UserContext } from "../../App";

const PrivateRoomModal = ({ open, close, roomName }) => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const roomsRef = collection(db, "activerooms");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, close]);

  const handleChange = (e) => {
    if (e.target.value.length < 30) {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    console.log(roomName);

    const userRoom = await getDocs(
      query(roomsRef, where("name", "==", roomName))
    );

    const roomData = userRoom.docs[0].data();

    if (password === roomData.password) {
      setMessage("Success!");
    } else {
      setMessage("Wrong Password!");
    }
  };

  return (
    <Box>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              width: "50vw",
              height: "25vh",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "rgba(0,0,0,0.8)",
            }}
          >
            <form onSubmit={onSubmit}>
              <label>Input Password to {roomName}</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
              />
              <button type="submit">Enter Room</button>
            </form>
            <Typography>{message}</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PrivateRoomModal;
