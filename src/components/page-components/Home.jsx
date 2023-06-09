import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const googleSignOut = () => {
    signOut(auth).then((r) => {
      setUser({ loggedIn: false, username: "" });
    });
    navigate("/");
  };

  return (
    <div>
      <Button onClick={googleSignOut}>Sign out</Button>
      <p>Homepage</p>
    </div>
  );
};

export default Home;
