import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const FormStatus = () => {
  const [login, setLogin] = useState(true);

  const changePage = () => {
    setLogin(!login);
  };

  return (
    <div>
      {login ? (
        <LoginForm changePage={changePage} />
      ) : (
        <SignupForm changePage={changePage} />
      )}
    </div>
  );
};

export default FormStatus;
