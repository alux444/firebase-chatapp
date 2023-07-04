import React, { useContext } from "react";
import { UserContext } from "../App";
import { addDoc, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../server/firebaseConfig";
import { query } from "firebase/database";

const useFirebase = () => {
  const { user, setUser } = useContext(UserContext);
  const usersRef = collection(db, "users");

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

  const googleAttemptLogin = async (email) => {
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const username = userData.username;
      setUser({ loggedIn: true, username: username, email: email });
      localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
    } else {
      const username = email.split("@")[0];
      createUser(username, email);
      setUser({ loggedIn: true, username: username, email: email });
      localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
    }
  };

  return { createUser, googleAttemptLogin };
};

export default useFirebase;
