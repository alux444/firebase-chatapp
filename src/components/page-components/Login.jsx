import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { auth, provider } from "../../../server/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../../App";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const usersRef = collection(db, "users");

  const googleSignIn = () => {
    const createUser = async (username, email) => {
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", email))
      );

      if (querySnapshot.empty) {
        await addDoc(usersRef, {
          username: username,
          email: email,
        });
      }
    };

    signInWithPopup(auth, provider).then((result) => {
      const username = result.user.email.split("@")[0];
      setUser({ loggedIn: true, username: username });
      createUser(username, result.user.email);
    });
  };

  return (
    <Box>
      <Box>
        <p>Sign in with Google to continue</p>
        <Button onClick={googleSignIn}>Sign In</Button>
      </Box>
    </Box>
  );
};

export default Login;
