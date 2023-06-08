import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { auth, provider } from "../../server/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const googleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      setLoggedIn(true);
    });
  };

  const googleSignOut = () => {
    signOut(auth).then((r) => {
      setLoggedIn(false);
      console.log("aa");
    });
  };

  return (
    <Box>
      <Box>
        <p>Sign in with Google</p>
        <Button onClick={googleSignIn}>Sign In</Button>
        <Button onClick={googleSignOut}>Sign Out</Button>
        {loggedIn ? <p>Logged In</p> : <p>Logged out</p>}
      </Box>
    </Box>
  );
};

export default Login;
