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

const CreateRoom = ({ open, close }) => {
  const { user } = useContext(UserContext);
  const [roomName, setRoomName] = useState(`${user.username}'s Room`);
  const [roomPassword, setRoomPassword] = useState("");
  const [privateStatus, setPrivateStatus] = useState(false);
  const [message, setMessage] = useState("");
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

  const handleChangeName = (e) => {
    if (e.target.value.length < 30) {
      setRoomName(e.target.value);
    }
  };

  const handleChangePass = (e) => {
    if (e.target.value.length < 30) {
      setRoomPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (privateStatus) {
      if (roomPassword.length == 0) {
        setMessage("Set a password or change room to public!");
      }
    }

    const createRoom = async () => {
      await addDoc(roomsRef, {
        name: roomName,
        password: roomPassword,
        privacy: privateStatus,
        time: serverTimestamp(),
        owner: user.email,
      });
    };

    const userRoom = await getDocs(
      query(roomsRef, where("owner", "==", user.email))
    );

    if (userRoom.empty) {
      createRoom();
      setMessage("Success! Room created.");
    } else {
      setMessage("You already have a chatroom!");
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
              height: "50vh",
              border: "1px solid white",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.8)",
            }}
          >
            <Box sx={{ display: "block" }}>
              <button style={{ margin: "10px" }} onClick={close}>
                Close
              </button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <form onSubmit={onSubmit}>
                <label>Room Name</label>
                <input
                  type="text"
                  placeholder="Enter your new username"
                  value={roomName}
                  onChange={handleChangeName}
                />
                <Box sx={{ display: "flex" }}>
                  <p>Private room?</p>
                  <input
                    type="checkbox"
                    onChange={(event) => setPrivateStatus(event.target.checked)}
                  />
                </Box>
                {privateStatus ? (
                  <Box>
                    <label>Room Password</label>
                    <input
                      type="text"
                      value={roomPassword}
                      onChange={handleChangePass}
                    />
                  </Box>
                ) : null}
                <button type="submit">Create Room</button>
              </form>
            </Box>
            <Typography sx={{ textAlign: "center" }}>{message}</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateRoom;
