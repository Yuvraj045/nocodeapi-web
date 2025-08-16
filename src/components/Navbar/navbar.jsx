import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import auth from "../../services/auth";

const Navbar = () => {
  const user = auth.getUser();
  const handleLogout = () => {
    console.log("logout");
    auth.logout();
    window.location.replace("/signin");
  };
  return (
    <div className="navbar">
      <Link to="/ " className="logo">
        SUPER-API
      </Link>
      <div className="nav-link">
        <Link to="/faq">FAQs</Link>
        {!user && <Link to="/signin">Log In</Link>}
        {user && (
          <span
            className="logout"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
