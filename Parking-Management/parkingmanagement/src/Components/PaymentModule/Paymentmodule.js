// Importing required files for Payment Module Component
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Paymentmodule.css'

const Paymentmodule = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [price, setPrice] = useState(null); // State to store the price
  
  // Parse the URL parameters to retrieve formData.price
  useEffect(() => {
    
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get("price");
    console.log("Price retrieved from URL parameter: ", price);
    
    setPrice(price); // Set the price in state
    
  }, [location.search]);

  const handlePayment = async () => {
    try {
      if (!price) {
        console.error("Price not found");
        // navigate("/api/payment")
        return;
      }

      setPaymentInProgress(true);

      const response = await axios.post("http://localhost:8080/api/payment", {
        amount: price,
      });

      const data = await response.data;
      console.log("Data: ", data);
      console.log("Order ID: ", data.id);

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
        amount: data.amount, // The amount in paise (1 Rupee = 100 paise)
        currency: "INR",
        name: "Park-King",
        description: "Payment for Parking",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successfull");
          navigate("/Home");
        },
        prefill: {
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#581845", // Color of the Checkout form
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error
    } finally {
      setPaymentInProgress(false);
    }
  };

  return (
    <div className="container">
      <form className="payment-form">
        <pre>
          <div>
            <h1 style={{ textAlign: "center", paddingBottom: 10 }}>
              Thank you!!!
            </h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center", paddingBottom: "10" }}>
              Form Submitted to the Parking Owner...
            </h1>
          </div>
          <div>
          <h1 style={{ textAlign: "center" }}>Price: Rs.{price}</h1>
          </div>
        </pre>
        <button
          type="button"
          onClick={handlePayment}
          disabled={paymentInProgress}
          style={{alignItems: "center", color: "white", backgroundColor: "green",  width: "50%"}}
        >
          {paymentInProgress ? "Processing Payment..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Paymentmodule;
