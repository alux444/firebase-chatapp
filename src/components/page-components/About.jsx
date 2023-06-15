import React from "react";

const About = () => {
  return (
    <div>
      <h2>Firebase Chatapp</h2>
      <p>This is a simple live chatapp created with React and Firebase.</p>
      <p>
        The source repository can be found{" "}
        <a href="https://github.com/alux444/firebase-chatapp">here.</a>
      </p>
      <p>Features to be added:</p>
      <small>
        <s>Username changing with messages updating.</s>
      </small>
      <br />
      <small>
        <s>Private chatrooms</s>
      </small>
      <br />
      <small>Image and link integration</small>
    </div>
  );
};

export default About;
