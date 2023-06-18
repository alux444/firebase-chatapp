import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { db } from "../../../server/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CurrentRoomContext, UserContext } from "../../App";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadImage from "../action-components/UploadImage";
import { v4 as uuidv4 } from "uuid";

const InputArea = () => {
  const { currentRoom } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const messagesRef = collection(db, "messages");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const handleChange = (e) => {
    if (e.target.value.length < 200) {
      setMessage(e.target.value);
    } else {
      alert("Character limit reached!");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setUploading(true);
    let url = "";

    if (image) {
      try {
        const storageRef = ref(storage, "images/" + uuidv4());
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        url = downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
      }
    }

    console.log(url);

    const createMessage = async () => {
      await addDoc(messagesRef, {
        time: serverTimestamp(),
        username: user.username,
        message: message,
        room: currentRoom,
        image: url,
      });
    };

    if (message.length > 0) {
      createMessage();
      setMessage("");
    }

    setImage(null);
    setUploading(false);
  };

  const closeUpload = () => {
    setUpload(false);
  };

  const setToImage = (image) => {
    setImage(image);
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
          disabled={uploading}
        />
        <button style={{ width: "90px", margin: "5px" }} type="submit">
          Send
        </button>
        <button
          style={{
            margin: "5px",
            border: image && "2px solid green",
          }}
          type="button"
          onClick={() => setUpload(true)}
        >
          <AddPhotoAlternateIcon fontSize="small" />
        </button>
      </form>
      <UploadImage open={upload} close={closeUpload} setImage={setToImage} />
    </Box>
  );
};

export default InputArea;
