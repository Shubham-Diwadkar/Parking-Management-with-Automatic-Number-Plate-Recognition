// Imported necessary libraries for Login Form Component
import React, { useState, useEffect } from 'react';
import './Loginform.css';
import { FaLock } from "react-icons/fa";
import { SiGmail } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "bootstrap/dist/css/bootstrap.min.css";

const Loginform = () => {
  const [formData, setFormData] = useState({
    email: "",
    Pass: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      // Redirect to home page if the user is already logged in
      navigate("/Home");
    }
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required!!!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please write a Valid Email";
    }
    if (!formData.Pass.trim()) {
      validationErrors.Pass = "Password is required!!!";
    } else if (formData.Pass.length < 6) {
      validationErrors.Pass = "Password should be at least 6 characters long!!!";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Fill the Form Properly ");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/login", formData);
        if (response.status === 200) {
          // Store session information in localStorage'
          localStorage.setItem('isLoggedIn', true);
          Cookies.set('email', formData.email, { expires: 7 }); 
          console.log(response);
          console.log("Session Started!!!")
          // Redirect to home page if login successful
          navigate("/Home");
        } else {
          // Alert registration message if user not found
          console.log(response)
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error appropriately (e.g., show error message)
      }
    }
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className="lf">
      <div className='wrapper'>
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input
              type='text'
              name='email'
              placeholder='Email Id'
              value={formData.email}
              onChange={onChange}
              required />

            <SiGmail className='icon' />
          </div>
          {errors.email &&
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
            </div>}
          <div className='input-box'>
            <input
              type='password'
              name='Pass'
              placeholder='Password'
              value={formData.Pass}
              onChange={onChange}
              required />
              
            <FaLock className='icon' />
          </div>
          {errors.Pass &&
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
              <div>{errors.Pass}</div>
            </div>}
          <div className='remember-forget'>
            <label>
              <input
                type='checkbox'
                name='rememberMe'
              />Remember Me
            </label>
            <a href='/'>Forgot Password</a>
          </div>

          <button type='submit'>Login</button>

          <div className='register-link'>
            <p>Don't have an account? <Link to={'/Register'}>Register</Link></p>
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
  )
}

export default Loginform;
