import React, { useEffect,useState } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import {auth, onAuthStateChanged} from './firebase';
import { BrowserRouter as Router, Route,Routes,Navigate,} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout, login } from "./features/userSlice.js";
import ProfileScreen from "./screens/profileScreen.js";

function App() {
  // const [user, setUser] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        //setUser(userAuth);
        console.log("User logged in:", userAuth);
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        }))

      } else {
        dispatch(logout());
        console.log("User logged out");

      }
    });
  
    return unsubscribe; // Removes the listener when the component unmounts
  }, []);
  
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (

          <Routes>
            <Route path="/profile" element={<ProfileScreen/>} />

            <Route path="/" element={<Navigate to="/Home" />} />

            <Route path="/Home" element={<HomeScreen />} />
          </Routes> 
        
        )}
      </Router>
    </div>
  );
}

export default App;
