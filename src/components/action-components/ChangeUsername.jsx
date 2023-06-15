import React, { useContext, useState, useRef, useEffect } from "react";
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
  const [error, setError] = useState("");
  const usersRef = collection(db, "users");
  const messagesRef = collection(db, "messages");
  const { user, setUser } = useContext(UserContext);

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

        allMessagesFromUser.forEach((doc) => {
          updateDoc(doc.ref, {
            username: name,
          });
        });

        setUser((prevUser) => ({
          ...prevUser,
          username: name,
        }));

        const updatedUser = {
          username: name,
          email: user.email,
        };

        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

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
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              width: "min-content",
              padding: "15px",
              height: "min-content",
              border: "1px solid white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.8)",
            }}
          >
            <Box>
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter your new username"
                  value={newName}
                  onChange={handleChange}
                />
                <button style={{ margin: "5px 0" }} type="submit">
                  Change
                </button>
              </form>
            </Box>
            <Typography sx={{ textAlign: "center" }}>{error}</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangeUsername;
