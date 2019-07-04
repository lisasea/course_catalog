import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return localStorage.getItem("id") ? (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <span>Welcome {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</span>
          <Link className="signout" to="/signout"> Sign Out </Link>
        </nav>
      </div>
    </div>
  ) : (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <Link className="signup" to="/signup"> Sign Up </Link>
          <Link className="signin" to="/signin"> Sign In </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;


// stateless functional components
//Displays the top menu bar for the application
//includes buttons for signing in and signing up
// (if there's not an authenticated user) or the user's first 
// and last name and a button for signing out (if there's an authenticated user).


