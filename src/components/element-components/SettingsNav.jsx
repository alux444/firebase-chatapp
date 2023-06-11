import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SettingsNav = () => {
  const { user, setUser } = useContext(UserContext);

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
        <Button>Change Username?</Button>
      </Box>
      <Button onClick={googleSignOut}>Sign out</Button>
    </Box>
  );
};

export default SettingsNav;
