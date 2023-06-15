import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
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

  const deleteRoom = async () => {
    const userRoom = await getDocs(
      query(roomsRef, where("owner", "==", user.email))
    );

    if (userRoom.empty) {
      setMessage("You don't have a room!");
      return;
    }

    if (!userRoom.empty) {
      const roomId = userRoom.docs[0].id;
      await deleteDoc(doc(roomsRef, roomId));
      setMessage("Your room has been deleted.");
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
              padding: "15px",
              width: "min-content",
              height: "min-content",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.8)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <div>
                <form
                  onSubmit={onSubmit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                    gap: "5px",
                  }}
                >
                  <label>Room Name</label>
                  <input
                    type="text"
                    placeholder="Enter your roomname"
                    value={roomName}
                    onChange={handleChangeName}
                  />
                  <Box sx={{ display: "flex" }}>
                    <p>Private room?</p>
                    <input
                      type="checkbox"
                      onChange={(event) =>
                        setPrivateStatus(event.target.checked)
                      }
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
                  <button onClick={() => deleteRoom()}>Delete Room</button>
                </form>

                <Typography sx={{ textAlign: "center" }}>{message}</Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateRoom;
