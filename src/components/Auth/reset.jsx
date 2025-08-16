import React from "react";
import "./style.scss";

const Reset = () => {
  return (
    <div className="form">
      <h2>Reset your password;</h2>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" value="example@gmail.com" readOnly></input>
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password"></input>
      <br />
      <label htmlFor="passwordc">Re-enter Password</label>
      <input type="password" id="passwordc"></input>
      <br />
      <button className="submit-btn">Reset Password</button>
      <br />
      <br />
    </div>
  );
};

export default Reset;
