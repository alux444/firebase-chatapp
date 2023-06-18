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
import MessageBox from "./MessageBox";

const MessagesArea = () => {
  const { autoScroll } = useContext(ScrollContext);
  const { currentRoom } = useContext(CurrentRoomContext);
  const latestMessagesRef = useRef(null);
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const scroll = () => {
    latestMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
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
    return <MessageBox message={message} key={message.time} />;
  });

  return (
    <Box sx={{ width: "100%", height: "85%", overflow: "hidden" }}>
      <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <button style={{ margin: "10px 0px" }} onClick={scroll}>
          Scroll to Bottom
        </button>
        {mappedMessages}
        <div ref={latestMessagesRef} />
      </Box>
    </Box>
  );
};

export default MessagesArea;
