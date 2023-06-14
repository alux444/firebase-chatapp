import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { db } from "../../../server/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CurrentRoomContext, UserContext } from "../../App";

const InputArea = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messagesRef = collection(db, "messages");
  const { currentRoom } = useContext(CurrentRoomContext);

  const handleChange = (e) => {
    if (e.target.value.length < 100) {
      setMessage(e.target.value);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const createMessage = async () => {
      await addDoc(messagesRef, {
        time: serverTimestamp(),
        username: user.username,
        message: message,
        room: currentRoom,
      });
    };

    if (message.length > 0) {
      createMessage();
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "15%",
        border: "1px solid white",
      }}
    >
      <form
        onSubmit={handleSendMessage}
        style={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          label="Send Message Here"
          onChange={handleChange}
          value={message}
          style={{
            input: { color: "white" },
            height: "30px",
            width: "85%",
            margin: "5px",
          }}
        />
        <button style={{ width: "90px", margin: "5px" }} type="submit">
          Send
        </button>
      </form>
    </Box>
  );
};

export default InputArea;
