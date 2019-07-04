import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '' 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }   
   
  handleSubmit = event => {
    console.log(this.state)
    event.preventDefault();
    let userInfo = {"password": this.state.password, "emailAddress": this.state.emailAddress} 
    this.props.signIn(userInfo)
  };

    change = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    render() {
        return ( 
            <div>
                <hr/>
                <div className="bounds">
                  <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input id="emailAddress" name="emailAddress" type="text" onChange={this.handleChange} placeholder="Email Address"/></div>
                            <div><input id="password" name="password" type="password" onChange={this.handleChange} placeholder="Password"/></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/sign-up.html">Click here</Link> to sign up!</p>
                  </div>
                </div>
            </div>
        );
    }
}
     
export default UserSignIn;


// provides the "Sign In" screen
// rendering a form that allows a user to sign using their existing account information
// component also renders a "Sign In" button 
// when clicked signs in the user 
// a "Cancel" button that returns the user to the default route (i.e. the list of courses).


