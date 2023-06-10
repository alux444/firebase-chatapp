import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../element-components/ChatRoom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const googleSignOut = () => {
    signOut(auth).then((r) => {
      setUser({ loggedIn: false, username: "" });
    });
    navigate("/");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          border: "1px solid white",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90vw",
        }}
      >
        <Typography>Welcome, {user.username}!</Typography>
        <Button onClick={googleSignOut}>Sign out</Button>
      </Box>
      <ChatRoom />
    </div>
  );
};

export default Home;
