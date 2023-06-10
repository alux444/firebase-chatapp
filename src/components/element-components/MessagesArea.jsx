import { Box, useScrollTrigger } from "@mui/material";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../server/firebaseConfig";

const MessagesArea = () => {
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const mappedMessages = messages.map((message) => (
    <Box key={message.id}>
      <small>{message.username}</small>
      <p>{message.message}</p>
    </Box>
  ));

  return <Box sx={{ width: "100%", height: "80%" }}>{mappedMessages}</Box>;
};

export default MessagesArea;
