import { Redirect } from "react-router-dom";
import React, {Component} from "react";

class UserSignOut extends Component {
    render() {
      return(<Redirect to='/courses' />);
    }
  }

export default UserSignOut;


// This component is a bit of an oddball as it doesn't render any visual elements. 
// Instead, it signs out the authenticated user
// and redirects the user to the default route (i.e. the list of courses).
//
