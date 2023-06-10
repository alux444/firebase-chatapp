import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { auth, provider } from "../../../server/firebaseConfig";
import {
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { UserContext } from "../../App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const test = () => {
    console.log(user);
  };

  const googleSignIn = () => {
    // setPersistence(auth, browserSessionPersistence)
    //   .then(() => {
    signInWithPopup(auth, provider).then((result) => {
      const username = result.user.email.split("@")[0];
      setUser({ loggedIn: true, username: username });
    });
    // })
    // .catch((error) => {});
  };

  return (
    <Box>
      <Box>
        <p>Sign in with Google</p>
        <Button onClick={googleSignIn}>Sign In</Button>
        {user.loggedIn ? <p>Welcome, {user.username}</p> : <p>Logged out</p>}
      </Box>
    </Box>
  );
};

export default Login;
