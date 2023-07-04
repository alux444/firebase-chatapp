import React from "react";

const About = () => {
  return (
    <div>
      <h2>Firebase Chatapp</h2>
      <p>This is a simple live chatapp created with React and Firebase.</p>
      <p>
        It includes real-time live updates from the Firestore, image hosting
        using the Firebase Storage and authenticates users using FirebaseAuth.
      </p>
      <p>
        The source repository can be found{" "}
        <a href="https://github.com/alux444/firebase-chatapp">here.</a>
      </p>
    </div>
  );
};

export default About;
