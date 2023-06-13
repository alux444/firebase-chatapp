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
        padding: "10px 0px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography sx={{ marginLeft: "10px" }}>
          Welcome, {user.username}!
        </Typography>
        <button onClick={() => openUsernameModal()}>Change Username?</button>
        <button onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? "Disable Autoscroll?" : "Enable Autoscroll?"}
        </button>
        <ChangeUsername open={openUsername} close={closeUsernameModal} />
      </Box>
      <button style={{ marginRight: "10px" }} onClick={googleSignOut}>
        Sign out
      </button>
    </Box>
  );
};

export default SettingsNav;
