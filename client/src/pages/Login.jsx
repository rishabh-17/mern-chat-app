import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    theme: "dark",
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const okay = handleValidations();
    const { username, password } = values;
    if (okay) {
      console.log("first validation");
      const data = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.data.status) {
        console.log(data);
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user));
        toast.success("Registered Successfully", toastOptions);
        navigate("/");
      } else {
        toast.error(data.data.msg, toastOptions);
      }
    }
  };

  const handleValidations = () => {
    if (values.username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }

    return true;
  };
  return (
    <>
    <div className="container ">
          <div className="row justify-content-center">
            <div className="col-sm-6">
      <form onSubmit={handleSubmit} className="my-5 text-white p-5 border rounded-5">
        <div className="d-flex p-2 ">
          <img src={logo} alt="logo" width={"70px"} />
          <h1>ChatJet</h1>
        </div>
        
          <input
            className="form-control my-3 rounded-4"
            type="text"
            name="username"
            id="username"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className="form-control my-3 rounded-4"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <div class="d-grid gap-2">
            <button
              className="btn btn-secondary my-3 fw-bold rounded-5"
              tabindex="-1"
              type="submit"
            >
              Log In
            </button>
          
        </div>
        <div className="my-5 text-center">
        <h6>
          DON'T HAVE AN ACCOUNT?<Link to="/register">  SIGN UP</Link>
        </h6>
        </div>
      </form>
      </div>
          </div>
          </div>
      <ToastContainer />
    </>
  );
}

export default Login;
