import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./css/global.css";

// import components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import PrivateRoute from "./components/PrivateRoute";
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

class App extends Component { //set global state includes user log in
  constructor() {
    super();
  this.state = {
    isLoggedIn: localStorage.getItem("IsLoggedIn"),
  };
  this.signIn = this.signIn.bind(this);
  }

  signIn(userInfo) { //gets authenticated user + data & handles sign-in
    axios.get("http://localhost:5000/api/users", {
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(res => {
      localStorage.setItem('FirstName',res.data.firstName)
      localStorage.setItem('LastName', res.data.lastName)
      localStorage.setItem('Email',userInfo.emailAddress)
      localStorage.setItem('Password',userInfo.password)
      localStorage.setItem('UserId', JSON.stringify(res.data.id))
      localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      this.setState({ isLoggedIn: true });
      window.location.assign('/')
    }).catch(error => {
      console.log(error.response.data);
    })
  }

  signOut = () => { /signs out, clears 
    localStorage.clear();
    this.setState({ isLoggedIn: false });
  };

  render() { //render routes with PrivateRoute on Create and UpdateCourse routes
    return (
      <BrowserRouter>
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Redirect exact from="/" to="/courses" />
          <Route exact path="/courses" component={Courses} />
          <PrivateRoute exact path="/courses/create"  component={CreateCourse} /> 
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} /> 
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route exact path="/signin" render={() => <UserSignIn  signIn={this.signIn}/>} /> 
          <Route exact path="/signup" render={() => <UserSignUp signIn={this.signIn} />} />
          <Route exact path="/signout" render={() => <UserSignOut signOut={this.signOut} />} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;