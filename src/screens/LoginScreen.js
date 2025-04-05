import React from "react";
import { useState } from "react";
import './LoginScreen.css';
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="LoginScreen">
      <div className="loginscreen_bg">
        <img
          className="loginscreenlogo"
          src=" https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
        ></img>

        <button 
        onClick={() => setSignIn(true)} className="loginscreen_button">
          Sign In
        </button>

        <div className="loginscreen_gradient" />
      </div>
      <div className="loginscreen_body">

        {signIn ? (<SignUpScreen/>
        ) : (
        
        <>
          <h1>Unlimited Movies, TV Series and more</h1>
          <h2>Watch anywhere on any device, cancel anytime</h2>
          <h3>Readt to start? enter your email to get going!</h3>

          <div className="loginscreen_input">
            <form>
              <input type="email" placeholder="Email address" />
              <button
                onClick={() => setSignIn(true)}
                className="loginscreen_getstarted"
              >
                Get Started
              </button>
            </form>
          </div>
        </>

        )}
             

        
      
      </div>
    </div>
  );
}

export default LoginScreen;
