import React, { useContext, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { UserContext } from "../../App";

const ChangeUsername = ({ open, close }) => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const usersRef = collection(db, "users");
  const messagesRef = collection(db, "messages");
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    if (e.target.value.length < 30) {
      setNewName(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setError("");

    const tryChange = async (name) => {
      const querySnapshot = await getDocs(
        query(usersRef, where("username", "==", name))
      );

      const userDocs = await getDocs(
        query(usersRef, where("email", "==", user.email))
      );

      if (!querySnapshot.empty) {
        setError(true);
        return;
      }

      if (!userDocs.empty) {
        await updateDoc(userDocs.docs[0].ref, {
          username: name,
        });

        const allMessagesFromUser = await getDocs(
          query(messagesRef, where("username", "==", user.username))
        );

        console.log(user.username);

        allMessagesFromUser.forEach((doc) => {
          updateDoc(doc.ref, {
            username: name,
          });
        });

        setError("Success! Your name was changed.");
      }
    };

    tryChange(newName);

    setNewName("");
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
            border: "1px solid red",
          }}
        >
          <Box
            sx={{
              width: "50vw",
              height: "20vh",
              border: "1px solid white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "block" }}>
              <button style={{ margin: "10px" }} onClick={close}>
                Close
              </button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Enter your new username"
                  value={newName}
                  onChange={handleChange}
                />
                <button type="submit">Change</button>
              </form>
            </Box>
            <Typography>{error}</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangeUsername;
