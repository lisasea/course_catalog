import { Redirect } from "react-router-dom";
import React, {Component} from "react";

const UserSignOut = props => {
  props.signOut();
  return (<Redirect to='/courses' />);
}

export default UserSignOut;


// This component signs out the authenticated user
// and redirects the user to the default route
