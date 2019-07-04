import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

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
  this.state = {};
  this.signIn = this.signIn.bind(this);
  }

  signIn(userInfo) { //taken from internet 
    axios.get("http://localhost:5000/api/users", {
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(res => { console.log(res.data)
      window.localStorage.setItem('FirstName',res.data.firstName)
      window.localStorage.setItem('LastName', res.data.lastName)
      window.localStorage.setItem('Email',userInfo.emailAddress)
      window.localStorage.setItem('Password',userInfo.password)
      window.localStorage.setItem('UserId', JSON.stringify(res.data._id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      window.location.assign('/')
    })
  }

  signOut = () => {
    localStorage.clear();
  };

  render() {
    return (
      <BrowserRouter>
      <div>
        <Header  />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create"  component={CreateCourse} /> 
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} /> 
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route exact path="/signin" component={() => <UserSignIn  signIn={this.signIn}/>} /> 
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signout" component={UserSignOut} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;

/*/ below code adapted from https://alligator.io/react/axios-react/
export default class CoursesList extends React.Component {
  state = {
    isLoading: true,
    courses: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/courses`)
      .then(res => {
        const courses = res.data;
        this.setState({ courses });
      })
  }

  render() {
    return (
      <ul>
        { this.state.courses.map(course => <li>{course.title}</li>)}
      </ul>
    ) }
}
*/