import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import http from "../../services/http";
import { Checkbox, CircularProgress, Snackbar } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(0);
  let [message, setMessage] = useState("");

  const handleClose = () => setOpen(0);

  const handleVisible = () => setVisible(!visible);

  const handleSignup = async () => {
    if (email === "") {
      setMessage("Email is required");
      setOpen(1);
      console.log(message);
      return;
    }
    if (name === "") {
      setMessage("Name is required");
      setOpen(1);
      return;
    }
    if (password.length < 8) {
      setMessage("Password have atleast 8 characters");
      setOpen(1);
      return;
    }
    if (password1 !== password) {
      setMessage("Password not matched");
      setOpen(1);
      return;
    }
    const user = {
      email,
      name,
      password,
    };
    setLoading(true);
    try {
      console.log(user);
      const response = await http.post("/user/signup", user);
      console.log(response);
      setMessage("SignUp Success");
      setOpen(1);
      setTimeout(() => {
        window.location.replace("/signin");
      }, 1000);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
      setOpen(1);
      setLoading(false);
    }
  };
  return (
    <div className="form">
      <div className="hed">Create New Account</div>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br />
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
      <label htmlFor="password1">Re-enter Password</label>
      <input
        type={visible ? "text" : "password"}
        id="password1"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      ></input>
      <br />
      <Checkbox size="small" onChange={handleVisible} checked={visible} />
      <small>Show Password</small>
      <button className="submit-btn" onClick={handleSignup} disabled={loading}>
        {!loading ? "Sign Up" : <CircularProgress size={16} color="inherit" />}
      </button>
      <br />
      <br />
      <hr />
      <div style={{ textAlign: "center", margin: "20px" }}>
        Already have an account?{"  "}
        <Link to="/signin" className="link">
          Log In
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

export default Signup;
