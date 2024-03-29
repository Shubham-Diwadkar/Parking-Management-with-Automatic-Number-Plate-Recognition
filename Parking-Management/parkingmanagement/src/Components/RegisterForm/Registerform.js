import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./Registerform.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Registerform = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

//   const notify = (message) => {
//    //  toast(message);
//     console.log(`tostify with message: ${message}`);
//   };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "User Name is required!!!";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required!!!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please write a Valid Email";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required!!!";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Use atleast 6 characters!";
      // notify(validationErrors.password);
    }

    if (formData.confirmpassword !== formData.password) {
      validationErrors.confirmpassword = "Passwords do not match!!!";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Fill the Form Properly ");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/register",
          formData
        ); // Updated endpoint
        if (response.data.success) {
          // Redirect to home page or dashboard if registration successful
          alert("User registration is successfully complete!!!");
          navigate("/");
        } else {
          alert("Registration failed! Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error appropriately (e.g., show error message)
      }
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="rf">
      <div className="wrapper">
        <form action="POST" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={onChange}
              required
            />
            <FaUser className="icon" />
          </div>
          {errors.username && (
            <div
              className="alert alert-warning d-flex align-items-center"
              style={{marginTop: '5px'}}
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              >
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>{errors.username}</div>
            </div>
          )}
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email Id"
              onChange={onChange}
              required
            />
            <SiGmail className="icon" />
          </div>
          {errors.email && (
            <div
              className="alert alert-warning d-flex align-items-center"
              style={{marginTop: '5px'}}
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              >
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>{errors.email}</div>
            </div>
          )}
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              required
            />
            <FaLock className="icon" />
          </div>
          {errors.password && (
            <div
              className="alert alert-warning d-flex align-items-center"
              style={{marginTop: '5px'}}
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              >
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>{errors.password}</div>
            </div>
          )}
          <div className="input-box">
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={onChange}
              required
            />
            <FaLock className="icon" />
          </div>
          {errors.confirmpassword && (
            <div
              className="alert alert-warning d-flex align-items-center"
              style={{marginTop: '5px'}}
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              >
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>{errors.confirmpassword}</div>
            </div>
          )}
          <div className="remember-forget">
            <label>
              <input type="checkbox" name="rememberMe" />
              Remember Me
            </label>
          </div>

          <button type="submit" name="submit">
            Register
          </button>

          <div className="register-link">
            <p>
              Already have an account? <Link to={"/"}>Login</Link>
            </p>
          </div>
        </form>

        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol
            id="exclamation-triangle-fill"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </symbol>
        </svg>
      </div>
    </div>
  );
};

export default Registerform;
