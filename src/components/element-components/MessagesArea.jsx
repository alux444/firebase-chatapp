import { Box, useScrollTrigger } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../server/firebaseConfig";

const MessagesArea = () => {
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("hello");

    const getMessages = async () => {
      const data = await getDocs(messagesRef);
      const newMessages = data.docs.map((doc) => ({ ...doc.data() }));

      if (JSON.stringify(messages) !== JSON.stringify(newMessages)) {
        setMessages(newMessages);
      }
      console.log(messages);
    };

    getMessages();
  }, [messages]);

  const mappedMessages = messages.map((message) => (
    <Box key={message.id}>
      <small>{message.username}</small>
      <p>{message.message}</p>
    </Box>
  ));

  return <Box sx={{ width: "100%", height: "80%" }}>{mappedMessages}</Box>;
};

export default MessagesArea;
