
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

function Popup({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const loadingIntervalRef = useRef(null);

  // ESC key closes popup
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Loading dot animation
  useEffect(() => {
    if (isLoading) {
      let dots = "";
      loadingIntervalRef.current = setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        setLoadingDots(dots);
      }, 500);
    } else {
      clearInterval(loadingIntervalRef.current);
      setLoadingDots("");
    }
    return () => clearInterval(loadingIntervalRef.current);
  }, [isLoading]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleProceedClick = async () => {
    setIsLoading(true);
    try {
      // STEP 1: Initiate wallet grant (POST)
      const grantPayload = {
        phone_number: phone,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins from now
        max_amount: "10000",
        meta_data: "Subscription for phone wallet",
        enterprise: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      };
      // const grantRes = await fetch("https://potion.dev.gumisofts.com/apis/enterprises/enterprises/grants/", {
       const grantRes = await fetch("/apis/enterprises/enterprises/grants/", {
      
      //const grantRes = await await fetch("https://potion.dev.gumisofts.com/apis/enterprises/enterprises/grants/", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Enterprise-ID": "enterprise Btad",
          "X-Enterprise-Secret": "0987654321"
        },
        body: JSON.stringify(grantPayload)
      });

      if (!grantRes.ok) {
        const errText = await grantRes.text();
        throw new Error("Grant request failed: " + errText);
      }

      // STEP 2: Simulate 25s delay for wallet user to grant permission
      await delay(25000);

      // STEP 3: Make subscription request
      const subscriptionPayload = {
        features: [{ content: "Basic Subscription" }],
        name: "Monthly Access",
        frequency: 2592000, // 30 days in seconds
        fixed_price: 10000,
        is_active: true,
        has_fixed_price: true,
        payment_type: "pre",
        service: "valid-service-id-here" // <-- Replace with real service ID from your backend
      };

      const subRes = await fetch("https://potion.dev.gumisofts.com/subscriptions/subscriptions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionPayload)
      });

      if (subRes.ok) {
        onSuccess();
      } else {
        const errText = await subRes.text();
        console.error("Subscription failed:", errText);
        alert("Subscription failed.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during the payment process.");
    }
    setIsLoading(false);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[79]/.test(value)) {
      setPhone(value);
    }
  };

  return ReactDOM.createPortal(
    <div className="popup_overlay">
      <div className="popup_content">
        <button className="popup_close" onClick={onClose}>X</button>
        <h2>Phone Wallet Payment</h2>
        <form className="payment_form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Wallet Owner's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="payment_input"
          />
          <div className="phone_input_wrapper">
            <span className="country_code">+251-</span>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={handlePhoneChange}
              className="payment_input phone_input"
            />
          </div>
          <button
            type="button"
            className="otp_button"
            onClick={handleProceedClick}
            disabled={!name || !phone || isLoading}
          >
            {isLoading ? `Waiting on Grant${loadingDots}` : "Proceed"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default Popup;



















