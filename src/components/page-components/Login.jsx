import React, { useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { auth, provider } from "../../../server/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../../App";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { useNavigate } from "react-router-dom";
import LoginForm from "../element-components/LoginForm";
import FormStatus from "../element-components/FormStatus";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  const googleSignIn = () => {
    setDisableButton(true);
    setMessage("Loading...");

    const searchForUser = async (email) => {
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", email))
      );

      if (!querySnapshot.empty) {
        setMessage("Found user, logging you in...");
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const username = userData.username;
        setUser({ loggedIn: true, username: username, email: email });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, email })
        );
      } else {
        const username = email.split("@")[0];
        setMessage("New user! Creating account...");
        createUser(username, email);
        setUser({ loggedIn: true, username: username, email: email });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, email })
        );
      }
    };

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
      searchForUser(result.user.email);
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { username, email } = JSON.parse(loggedInUser);
      setUser({ loggedIn: true, username, email });
    }
  }, []);

  return (
    <Box>
      <Box>
        {!user.loggedIn ? (
          <Box>
            <FormStatus />
            <p>Sign in with Google</p>
            <button disabled={disableButton} onClick={() => googleSignIn()}>
              Sign In
            </button>
            <br />
            {message}
          </Box>
        ) : (
          <Box>
            <p>Welcome, {user.username}!</p>
            <button onClick={() => navigate("/firebase-chatapp/home")}>
              Join Chatroom
            </button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
