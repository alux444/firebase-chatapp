import React, { useState } from "react";

const LoginForm = ({ changePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={onSubmit}>
      <input type="text" />
      <input type="password" />
      <button type="submit">Login</button>
      <button type="button" onClick={changePage}>
        Sign up?
      </button>
    </form>
  );
};

export default LoginForm;
