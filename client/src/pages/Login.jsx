import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    username: "",
    password: ""
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
    const { username,password} = values;
    if (okay){
      console.log('first validation')
      const data = await axios.post(loginRoute, {
        username,
        password
      })

      if (data.data.status){
        console.log(data)
          localStorage.setItem('chat-app-user', JSON.stringify(data.data.user));
          toast.success("Registered Successfully", toastOptions)
          navigate('/')
      }
      else{
        toast.error(data.data.msg, toastOptions);
      }
    }
  };

  const handleValidations = () => {
    if (values.username ===''){
      toast.error("Username is required", toastOptions )
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
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
    

          <button type="submit">Log In</button>
        </div>
        <h2>
          DON'T HAVE AN ACCOUNT? <Link to="/register">SIGN UP</Link>
        </h2>
      </form>
      <ToastContainer />
    </>
  );
}

export default Login;
