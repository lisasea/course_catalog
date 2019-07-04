import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

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
  
    handleInputChange = e => {
        e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.signIn(this.state)
    };

    render(){
        return(
          <div>
            <hr />
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
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

export default UserSignUp
// This component provides the "Sign Up" screen 
// rendering a form that allows a user to sign up by creating a new account
//  also renders a "Sign Up" button
//  when clicked sends a POST request to the REST API's /api/users route 
//   signs in the user. 
//  This component also renders a "Cancel" button t
//  returns the user to the default route (i.e. the list of courses).










