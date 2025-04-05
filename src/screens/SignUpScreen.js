import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice"; // Import login action
import "./SignUpScreen.css";
import React, { useRef } from "react";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => { 
        console.log("Registered user: ", authUser.user);

        // Dispatch user to Redux store
        dispatch(
          login({
            uid: authUser.user.uid,
            email: authUser.user.email,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log("Signed in user:", authUser.user);

        // Dispatch user to Redux store
        dispatch(
          login({
            uid: authUser.user.uid,
            email: authUser.user.email,
          })
        );
      })
      .catch((error) => {
        console.error("Sign-in error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="SignUpScreen">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" ref={emailRef} type="Email" />
        <input placeholder="password" ref={passwordRef} type="password" />
        <button type="Submit" onClick={signIn}>
          Sign In
        </button>
      </form>

      <h4>
        <span className="signupscreen_gray"> New to Netflix? </span>
        <span className="signupscreen_link" onClick={register}>
          Sign Up now.
        </span>
      </h4>
    </div>
  );
}

export default SignUpScreen;
