
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
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
    const controller = new AbortController();
    const startTime = Date.now();
    let grantId = null;
    let grantStatus = null;
  
    try {
      // ===== STEP 1: Initiate wallet grant =====
      const grantResponse = await axios.post(
        'https://potion.dev.gumisofts.com/apis/enterprises/enterprises/grants/',
        {
          phone_number: phone,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          max_amount: "5000",
          meta_data: "Subscription for phone wallet",
          enterprise: "13fb7c5b-3792-4f03-8314-ea7f3bfb1b02",
        },
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-Access-Id": "48af7d714e8e4e9f819a23a59d200102",
            "X-Access-Secret": "hhhbbb",
          },
          signal: controller.signal,
          withCredentials: true
        }
      );
  
      grantId = grantResponse.data.id;
      console.log("Grant ID:", grantId, "Status: GRANTED");
  
      // ===== STEP 2: Wait 15s then check grant status =====
      const timeAfterStep1 = Date.now() - startTime;
      const waitBeforeStep2 = Math.max(0, 15000 - timeAfterStep1);
      
      await new Promise(resolve => setTimeout(resolve, waitBeforeStep2));
      
      // Check grant status after 15s
      const statusCheck = await axios.get(
        `https://potion.dev.gumisofts.com/apis/enterprises/enterprises/grants/${grantId}/`,
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-Access-Id": "48af7d714e8e4e9f819a23a59d200102",
            "X-Access-Secret": "hhhbbb",
          },
        }
      );
      
      grantStatus = statusCheck.data.grant_status;
      console.log("Grant Status:", statusCheck.data.grant_status);
      
      // ===== STEP 3: Wait remaining time (total 25s) =====
      const timeAfterStep2 = Date.now() - startTime;
      const remainingWait = Math.max(0, 25000 - timeAfterStep2);

      if (grantStatus === 'approved') {
        // ===== STEP 4: Create subscription =====
        console.log("Creating subscription...");
        const subscriptionResponse = await axios.post(
          'https://potion.dev.gumisofts.com/subscriptions/subscriptions/',
          {
            "features": [
              {
                "content": "Premium subscription with exclusive access"
              }
            ],
            "name": "Gold Membership Plan",
            "frequency": 30,
            "fixed_price": 200,
            "is_active": true,
            "has_fixed_price": true,
            "payment_type": "pre",
            "service": "2a16cc31-c245-488d-9c39-5b799958dae4"
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Access-Id": "48af7d714e8e4e9f819a23a59d200102",
              "X-Access-Secret": "hhhbbb",
            },
            withCredentials: true
          }
        );
    
        console.log("Subscription created:", subscriptionResponse.data);
        onSuccess();
      } else if (remainingWait > 0) {
        console.log(`Waiting additional ${remainingWait}ms to complete 25s total`);
        await new Promise(resolve => setTimeout(resolve, remainingWait));
      }
  
      
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else if (error.response) {
        console.error("Error response:", {
          status: error.response.status,
          data: error.response.data
        });
        
        if (error.response.status === 404 && grantId) {
          alert("Grant not found - please try again");
        } else {
          alert(`Operation failed: ${error.response.data?.detail || 'Unknown error'}`);
        }
      } else {
        console.error("Network error:", error.message);
        alert("Network connection error");
      }
    } finally {
      setIsLoading(false);
      controller.abort();
    }
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



















