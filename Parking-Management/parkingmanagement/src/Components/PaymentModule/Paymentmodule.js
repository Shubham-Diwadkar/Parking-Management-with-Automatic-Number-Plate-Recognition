import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Paymentmodule.css'

// import ParkingForm from "../ParkingForm/Parkingform";

const Paymentmodule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [data, setData] = useState(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [price, setPrice] = useState(null); // State to store the price
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  // Parse the URL parameters to retrieve formData.price
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get("price");
    // const name = searchParams.get('name');
    // const email = searchParams.get('email');
    // const phoneNumber = searchParams.get('phoneNumber');
    console.log("Price retrieved from URL parameter: ", price);
    // console.log("Name retrieved from URL parameter: ", name);
    // console.log("Email retrieved from URL parameter: ", email);
    // console.log("PhoneNumber retrieved from URL parameter: ", phoneNumber);
    setPrice(price); // Set the price in state
    // setName(name || ''); // Set the name in state, with an empty string as a fallback
    // setEmail(email || ''); // Set the email in state, with an empty string as a fallback
    // setPhoneNumber(phoneNumber || ''); // Set the phoneNumber in state, with an empty string as a fallback
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
        key: "rzp_test_o2gjG5fQUCPsaf", // Replace with your Razorpay key
        amount: data.amount, // The amount in paise (1 Rupee = 100 paise)
        currency: "INR",
        name: "Park-King",
        description: "Payment for Parking",
        order_id: data.id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          navigate("/Home");
        },
        prefill: {
          // name: name, // Pre-filled customer name
          // email: email, // Pre-filled customer email
          // contact: phoneNumber, // Pre-filled customer contact number
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
