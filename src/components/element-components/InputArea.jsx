import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { db } from "../../../server/firebaseConfig";

const InputArea = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length < 100) {
      setMessage(e.target.value);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    console.log(message);

    const messageRef = db.collection("messages").doc();
    messageRef
      .set({
        content: message,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Message saved to the database!");
        setMessage(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error saving message to the database:", error);
      });
  };

  const handleAskTimmy = (e) => {
    e.preventDefault();
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
        <Button sx={{ width: "15%" }} type="submit">
          Send Message
        </Button>
        <Button sx={{ width: "15%" }} onClick={handleAskTimmy}>
          Ask Timmy
        </Button>
      </form>
    </Box>
  );
};

export default InputArea;
