import React from "react";
import "./profileScreen.css";
import Nav from "../Nav";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />

      <div className="profileScreenBody">
        <h1>Edit Profile</h1>
        <div className="pfs_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt=""
        />

          <div className="pfs_details">
            <h2>{user.email}</h2>
            <div className="pfs_plans">
              <h3>Plans</h3>
              <button
                onClick={() => auth.signOut()}
                className="pfs_signout_button"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
