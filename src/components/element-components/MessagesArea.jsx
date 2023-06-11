import { Box, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../server/firebaseConfig";
import { UserContext } from "../../App";

const MessagesArea = () => {
  const { user } = useContext(UserContext);
  const latestMessagesRef = useRef(null);
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const scroll = () => {
    latestMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("time", "asc")),
      (querySnapshot) => {
        const newMessages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMessages(newMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const mappedMessages = messages.map((message) => {
    const date = message.time ? new Date(message.time.seconds * 1000) : null;
    const formattedDate = message.time ? date.toLocaleString() : "Loading";

    return (
      <Box
        key={message.id}
        sx={{
          height: "min-content",
          width: "100%",
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
              borderRadius: "10px",
              wordBreak: "break-word",
              maxWidth: "80%",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "black",
            }}
          >
            {message.message}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Box sx={{ width: "100%", height: "80%", overflow: "auto" }}>
      <button onClick={scroll}>latest</button>
      {mappedMessages}
      <div ref={latestMessagesRef} />
    </Box>
  );
};

export default MessagesArea;
