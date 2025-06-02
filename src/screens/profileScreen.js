import React, { useState } from "react";
import "./profileScreen.css";
import Nav from "../Nav";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Popup from "./Popup";
import "./Popup.css";

function ProfileScreen() {
  const user = useSelector(selectUser);

  const [subscribedPlan, setSubscribedPlan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const plans = [
    { name: "Basic", quality: "720p", price: "$9.99", id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
    { name: "Standard", quality: "1080p", price: "$15.49", id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
    { name: "Premium", quality: "4K+HDR", price: "$19.99", id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
  ];

  const subscribeUser = async (plan) => {
    try {
      // const res = await fetch("https://zee8vkyn8l.execute-api.eu-north-1.amazonaws.com/dev/subscriptions/subscribe_service/", {
        const res = await fetch("https://potion.dev.gumisofts.com/subscriptions/subscribe_service/",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_active: true,
          subscription: plan.id
        })
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        alert("Failed to parse response.");
        return;
      }

      if (res.ok) {
        setSubscribedPlan(plan.name);
      } else {
        alert("Subscription failed: " + data.message);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Subscription failed.");
    }
  };

  const unsubscribeUser = async () => {
    const plan = plans.find(p => p.name === subscribedPlan);
    if (!plan) return;

    try {
      // const res = await fetch("https://zee8vkyn8l.execute-api.eu-north-1.amazonaws.com/dev/subscriptions/unsubscribe_service/", {
        const res = await fetch("https://potion.dev.gumisofts.com/subscriptions/unsubscribe_service/", {  
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: plan.id
        })
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        alert("Failed to parse response.");
        return;
      }

      if (res.ok) {
        setSubscribedPlan(null);
      } else {
        alert("Unsubscription failed: " + data.message);
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      alert("Unsubscription failed.");
    }
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreenBody">
        <h1>Edit Profile</h1>
        <div className="pfs_info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
          <div className="pfs_details">
            <h2>{user.email}</h2>
            <div className="pfs_plans">
              <h3>Plans</h3>
              {plans.map((plan) => (
                <div className="pfs_plan" key={plan.name}>
                  <div className="pfs_plan_info">
                    <h4>{plan.name}</h4>
                    <p>{plan.quality} - {plan.price}</p>
                  </div>
                  {subscribedPlan === plan.name ? (
                    <button
                      className="pfs_current_button"
                      onClick={() => setShowConfirmCancel(true)}
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      className="pfs_subscribe_button"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowPopup(true);
                      }}
                      disabled={!!subscribedPlan}
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => auth.signOut()} className="pfs_signout_button">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            subscribeUser(selectedPlan);
            setShowPopup(false);
            setSelectedPlan(null);
          }}
        />
      )}

      {showConfirmCancel && (
        <div className="popup_overlay">
          <div className="popup_content">
            <h3>Are you sure you wish to cancel this subscription?</h3>
            <div style={{ marginTop: "20px" }}>
              <button className="otp_button" onClick={unsubscribeUser}>
                Yes, Cancel
              </button>
              <button
                className="popup_close"
                onClick={() => setShowConfirmCancel(false)}
                style={{ marginLeft: "10px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileScreen;