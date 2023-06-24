import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    theme: "dark",
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const okay = handleValidations();
    const { username, email, password } = values;
    if (okay) {
      console.log("first validation");
      const data = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user));
        toast.success("Registered Successfully", toastOptions);
        navigate("/");
      } else {
        toast.error(data.data.msg, toastOptions);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidations = () => {
    if (values.password !== values.confirmPassword) {
      toast.error(
        "Password and Confirm Password must be the same",
        toastOptions
      );
      return false;
    }
    if (values.username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    if (values.password.length <= 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    }

    return true;
  };
  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <form
              onSubmit={handleSubmit}
              className="my-5 text-white p-5 border rounded-5"
            >
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
                type="email"
                name="email"
                id="email"
                placeholder="Email"
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
              <input
                className="form-control my-3 rounded-4"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-secondary my-3 fw-bold rounded-5"
                >
                  Register
                </button>
              </div>
              <h6>
                ALREADY HAVE AN ACCOUNT? <Link to="/login">LOG IN</Link>
              </h6>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
