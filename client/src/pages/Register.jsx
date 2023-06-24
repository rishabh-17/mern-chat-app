import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    theme: "dark"

  }

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const okay = handleValidations();
    const { username, email, password} = values;
    if (okay){
      console.log('first validation')
      const data = await axios.post(registerRoute, {
        username,
        email,
        password
      })

      if (data.data.status){ 
          localStorage.setItem('chat-app-user', JSON.stringify(data.data.user));
          toast.success("Registered Successfully", toastOptions)
          navigate('/')
      }
      else{
        toast.error(data.data.msg, toastOptions);
      }
    }
  };



  useEffect(()=>{
    if (localStorage.getItem("chat-app-user")){
      navigate('/')
    }
  },[])

  const handleValidations = () => {
    if (values.password !== values.confirmPassword) {
      toast.error("Password and Confirm Password must be the same", toastOptions)
      return false;
    }
    if (values.username ===''){
      toast.error("Username is required", toastOptions )
      return false;
    }
    if (values.password.length <=8){
      toast.error("Password should be at least 8 characters", toastOptions)
      return false;
    }

    return true;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={logo} alt="logo" width={"100px"} />
          <h1>ChatJet</h1>
        </div>
        <div className="container">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </div>
        <h2>
          ALREADY HAVE AN ACCOUNT? <Link to="/login">LOG IN</Link>
        </h2>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;
