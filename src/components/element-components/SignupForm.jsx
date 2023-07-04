import React, { useState } from "react";
import useFirebase from "../../utils/useFirebase";

const SignupForm = ({ changePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const { validateEmail, attemptLogin, createUser } = useFirebase();

  const emailHandle = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
  };

  const confirmHandle = (e) => {
    setConfirm(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 5) {
      setMessage("Password is too short.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    const emailUsed = await validateEmail(email);

    if (emailUsed) {
      setMessage("Email is in use.");
      return;
    }

    await createUser(email, false, password);
    const loginSuccess = await attemptLogin(email, password);
  };

  return (
    <form className="flex flex-col gap-1 items-center" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <small>Email</small>
        <input type="email" value={email} onChange={emailHandle} />
      </div>
      <div className="flex flex-col">
        <small>Password</small>
        <input type="password" value={password} onChange={passwordHandle} />
      </div>
      <div className="flex flex-col">
        <small>Confirm Password</small>
        <input type="password" value={confirm} onChange={confirmHandle} />
      </div>
      <button type="submit" className="mt-2">
        Sign up
      </button>
      <small>{message}</small>
      <button type="button" className="w-fit text-xs" onClick={changePage}>
        Login?
      </button>
    </form>
  );
};

export default SignupForm;
