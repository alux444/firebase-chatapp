import React from "react";

const SignupForm = ({ changePage }) => {
  return (
    <form className="flex flex-col gap-1 items-center">
      <input type="email" />
      <input type="text" />
      <input type="password" />
      <input type="password" />
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
