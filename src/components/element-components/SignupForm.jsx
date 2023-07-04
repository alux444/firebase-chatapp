import React, { useState } from "react";

const SignupForm = ({ changePage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const userHandle = (e) => {
    if (e.target.value.length < 30) {
      setUsername(e.target.value);
    }
  };

  const emailHandle = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
  };

  const confirmHandle = (e) => {
    setConfirm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-1 items-center" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <small>Username</small>
        <input type="text" value={username} onChange={userHandle} />
      </div>
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
      <button type="submit" className="">
        Sign up
      </button>
      <button type="button" className="w-fit text-xs" onClick={changePage}>
        Login?
      </button>
    </form>
  );
};

export default SignupForm;
