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

  return { createUser };
};

export default useFirebase;
