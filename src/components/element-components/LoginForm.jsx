import React, { useState } from "react";
import useFirebase from "../../utils/useFirebase";

const LoginForm = ({ changePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { attemptLogin } = useFirebase();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const loginSuccess = await attemptLogin(email, password);
    if (!loginSuccess) {
      setMessage("Invalid login details.");
    }
  };

  const emailHandle = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
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
      <button className="mt-2" type="submit">
        Login
      </button>
      <small>{message}</small>
      <button className="w-fit text-xs" type="button" onClick={changePage}>
        Sign up?
      </button>
    </form>
  );
};

export default LoginForm;
