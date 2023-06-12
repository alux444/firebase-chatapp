import React, { useContext, useState } from "react";
import { ScrollContext, UserContext } from "../../App";
import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ChangeUsername from "./ChangeUsername";

const SettingsNav = () => {
  const { user, setUser } = useContext(UserContext);
  const { autoScroll, setAutoScroll } = useContext(ScrollContext);
  const [openUsername, setOpenUsername] = useState(false);

  const openUsernameModal = () => {
    setOpenUsername(true);
  };

  const closeUsernameModal = () => {
    setOpenUsername(false);
  };

  const navigate = useNavigate();

  const googleSignOut = () => {
    signOut(auth).then((r) => {
      setUser({ loggedIn: false, username: "" });
    });
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid white",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90vw",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Welcome, {user.username}!</Typography>
        <Button onClick={() => openUsernameModal()}>Change Username?</Button>
        <Button onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? "Disable Autoscroll?" : "Enable Autoscroll?"}
        </Button>
        <ChangeUsername open={openUsername} close={closeUsernameModal} />
      </Box>
      <Button onClick={googleSignOut}>Sign out</Button>
    </Box>
  );
};

export default SettingsNav;
