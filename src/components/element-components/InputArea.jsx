import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const InputArea = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length < 100) {
      setMessage(e.target.value);
    }
  };

  const handleSendMessage = (e) => {
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
          sx={{ input: { color: "white" }, width: "80%" }}
        />
        <Button type="submit">Send Message</Button>
        <Button>Ask Timmy</Button>
      </form>
    </Box>
  );
};

export default InputArea;
