import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { UserContext } from "../../App";
import PreviewImage from "./PreviewImage";

const MessageBox = ({ message }) => {
  const [focusImage, setFocusImage] = useState(false);
  const { user } = useContext(UserContext);
  const date = message.time ? new Date(message.time.seconds * 1000) : null;
  const formattedDate = message.time ? date.toLocaleString() : "Loading";

  const closeImage = () => {
    setFocusImage(false);
  };

  return (
    <Box
      key={message.time}
      sx={{
        height: "min-content",
        width: "calc(100%-10px)",
        padding: "5px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            alignSelf:
              message.username === user.username ? "flex-end" : "flex-start",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          {message.username === user.username ? "You" : message.username} (
          {formattedDate})
        </Typography>
        <Typography
          sx={{
            alignSelf:
              message.username === user.username ? "flex-end" : "flex-start",
            border: "2px solid #646cff;",
            padding: "5px",
            margin: "2px 10px",
            borderRadius: "10px",
            wordBreak: "break-word",
            maxWidth: "80%",
            backgroundColor: "rgba(255,255,255,0.8)",
            color: "black",
          }}
        >
          {message.message}
          <br />
          {message.image == "" ? null : (
            <Button onClick={() => setFocusImage(true)}>
              <img
                src={message.image}
                style={{ maxWidth: "50vw", maxHeight: "20vh" }}
              />
            </Button>
          )}
        </Typography>
        {message.image == "" ? null : (
          <PreviewImage
            open={focusImage}
            close={closeImage}
            image={message.image}
          />
        )}
      </Box>
    </Box>
  );
};

export default MessageBox;
