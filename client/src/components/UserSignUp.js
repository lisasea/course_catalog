

import React, {Component} from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

class UserSignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        validationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    userSetup = () => {
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("firstName", this.state.firstName);
      localStorage.setItem("lastName", this.state.lastName);
      localStorage.setItem("email", this.state.emailAddress);
      localStorage.setItem("password", this.state.password);
      this.props.history.push("/");  
    }

    handleInputChange = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = e => {
      e.preventDefault();
      this.props.history.push("/courses");   
    };
  
    handleSubmit = e => {
      e.preventDefault();
      const {firstName, lastName, emailAddress, password, confirmPassword } = this.state;
      if (firstName === "") {
        this.setState({ validationErrors: "First name required"});
      } else if (lastName === "") {
        this.setState({ validationErrors: "Last name required"});
      } else if(emailAddress === "") { // check for valid password then make http request
        this.setState({validationErrors: "Email required"})
      } else if(password === "") { // check for valid password then make http request
        this.setState({validationErrors: "Password required"})
      } else if (password !== confirmPassword) {
        this.setState({validationErrors: "Confirm Password field does not match password value, please re-enter"})
      } else {
        axios.post("/api/users", {
          firstName,
          lastName,
          emailAddress, 
          password,
        })
        .then(res => {
          if(res.status === 201) { // http request success!
          console.log("You are signed up!");
          this.setState({validationErrors: ""})
          this.props.signIn({ emailAddress, password });
          }
        })
      };
    }

    render() { //renders a Sign Up form, Sign Up button and cancel button
      const { validationErrors } = this.state;
        return(
          <div>
            <hr />
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  {validationErrors ? (
                    <div>
                      <h2 className="validation--errors--label">Ooops!</h2>
                      <div className="validation-errors">
                        <ul>
                          <li>{validationErrors}</li>
                        </ul>
                      </div>
                    </div>
                  ):""}
                  <form onSubmit={this.handleSubmit}>
                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={e => this.handleInputChange(e)}/></div>
                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={e => this.handleInputChange(e)}/></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.handleInputChange(e)}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.handleInputChange(e)}/></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={e => this.handleInputChange(e)}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="sign-in.html">Click here</Link> to sign in!</p>
              </div>
            </div>
          </div>
        );
    }
} 



export default UserSignUp;

// This component provides the "Sign Up" screen 
// rendering a form that allows a user to sign up by creating a new account
//  also renders a "Sign Up" button
//  when clicked sends a POST request to the REST API"s /api/users route 
//   signs in the user. 
//  This component also renders a "Cancel" button t
//  returns the user to the default route (i.e. the list of courses).










