"use client";

import { useRef } from "react";
import app from "../Firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

export default function SignIn() {
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={email} className="border" />
        <input type="password" ref={password} className="border" />
        <button type="submit" className="border">
          login
        </button>
      </form>
    </div>
  );
}
