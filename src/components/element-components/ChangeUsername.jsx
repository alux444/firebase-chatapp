import React, { useContext, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { UserContext } from "../../App";

const ChangeUsername = ({ open, close }) => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(false);
  const usersRef = collection(db, "users");
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    if (e.target.value.length < 30) {
      setNewName(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setError(false);

    const tryChange = async (name) => {
      const querySnapshot = await getDocs(
        query(usersRef, where("username", "==", name))
      );

      const userDocs = await getDocs(
        query(usersRef, where("email", "==", user.email))
      );

      console.log(userDocs);

      if (querySnapshot.empty) {
        await updateDoc(userDocs.docs[0].ref, {
          username: name,
        });
      } else {
        setError(true);
        console.log(querySnapshot);
      }
    };

    tryChange(newName);
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
            <Typography>
              {error ? "Sorry, that name was taken..." : null}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangeUsername;
