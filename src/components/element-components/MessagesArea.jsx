import { Box, Typography } from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../server/firebaseConfig";
import { CurrentRoomContext, ScrollContext, UserContext } from "../../App";

const MessagesArea = () => {
  const { user } = useContext(UserContext);
  const { autoScroll } = useContext(ScrollContext);
  const { currentRoom } = useContext(CurrentRoomContext);
  const latestMessagesRef = useRef(null);
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const scroll = () => {
    latestMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        messagesRef,
        where("room", "==", currentRoom),
        orderBy("time", "asc")
      ),
      (querySnapshot) => {
        const newMessages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMessages(newMessages);
      }
    );

    return () => unsubscribe();
  }, [currentRoom]);

  useEffect(() => {
    if (autoScroll) {
      scroll();
    }
  }, [messages]);

  const mappedMessages = messages.map((message) => {
    const date = message.time ? new Date(message.time.seconds * 1000) : null;
    const formattedDate = message.time ? date.toLocaleString() : "Loading";

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
              margin: "0 5px",
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
    <Box sx={{ width: "100%", height: "85%", overflow: "auto" }}>
      <button style={{ margin: "10px 0px" }} onClick={scroll}>
        Scroll to Bottom
      </button>
      {mappedMessages}
      <div ref={latestMessagesRef} />
    </Box>
  );
};

export default MessagesArea;
