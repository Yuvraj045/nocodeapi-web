import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Checkbox, CircularProgress, Snackbar } from "@mui/material";
import http from "../../services/http";
import "./style.scss";
let path = window.location.pathname;
if (path === "/signin") path = "/";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(0);
  let [message, setMessage] = useState("");

  const handleClose = () => setOpen(0);
  const handleVisible = () => setVisible(!visible);

  const handleSignin = async () => {
    if (email === "") {
      setMessage("Email is required");
      setOpen(1);
      console.log(message);
      return;
    }
    if (password.length < 8) {
      setMessage("Password have atleast 8 characters");
      setOpen(1);
      return;
    }
    const user = {
      email,
      password,
    };
    setLoading(true);
    try {
      console.log(user);
      const response = await http.post("/user/signin", user);
      console.log(response);
      setMessage("Logged In Success");
      setOpen(1);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("name", response.data.user.name);
      setTimeout(() => {
        window.location.replace(path);
      }, 1000);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message || "something went Wrong");
      setOpen(1);
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="hed">Log in to your account</div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <br />
      <label htmlFor="password">Password</label>
      <input
        type={visible ? "text" : "password"}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br />
      <Checkbox size="small" onChange={handleVisible} checked={visible} />
      <small>Show Password</small>
      <br />
      <button className="submit-btn" onClick={handleSignin} disabled={loading}>
        {!loading ? "Sign In" : <CircularProgress size={16} color="inherit" />}
      </button>
      <br />
      <br />
      <hr />
      <div style={{ textAlign: "center", margin: "20px" }}>
        New to OTApi?{"  "}
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </div>
      <Snackbar
        open={open !== 0}
        autoHideDuration={6000}
        onClose={handleClose}
        size="small"
        message={open === 1 && message}
      ></Snackbar>
    </div>
  );
};

export default Signin;
