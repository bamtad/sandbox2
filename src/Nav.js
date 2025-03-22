import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className="nav">
      <div className={` nav ${show && "nav_black"}`}>
        <div className="nav_contents">
          <img
            className="nav_logo"
            src=" https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
          ></img>

          <img
            className="avatar_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Nav;
