import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { db } from "../../../server/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../App";

const InputArea = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messagesRef = collection(db, "messages");

  const handleChange = (e) => {
    if (e.target.value.length < 100) {
      setMessage(e.target.value);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    console.log(message);

    const createMessage = async () => {
      await addDoc(messagesRef, {
        time: serverTimestamp(),
        username: user.username,
        message: message,
      });
    };

    createMessage();
    setMessage("");
  };

  return (
    <Box sx={{ width: "100%", height: "20%", border: "1px solid red" }}>
      <form onSubmit={handleSendMessage}>
        <TextField
          id="filled-basic"
          label="Send Message Here"
          variant="filled"
          onChange={handleChange}
          value={message}
          sx={{ input: { color: "white" }, width: "70%" }}
        />
        <Button sx={{ width: "25%" }} type="submit">
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default InputArea;
