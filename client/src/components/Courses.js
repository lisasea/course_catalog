import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component { // setup empty courses array
  constructor(props){
    super(props)
    this.state = {
      courses: [],
      loading: true
    };
  }

componentDidMount() { // get list of courses from REST API /api/courses route
  axios.get("http://localhost:5000/api/courses")
  .then (res => {
    this.setState({
      courses: res.data,
      loading: false
    })
  })
}

  render() { //maps over courses, renders a list of courses and creates link to "Course Detail" screen and link to "Create Course" screen
      const courses = this.state.courses;
      console.log("here", courses);
      let courseModules;
      if (courses.length > 0)  {
        courseModules = courses.map((course, index) => (
          <div className="grid-33" key={index}>
            <Link className="course--module course--link" to={"/courses/" + course.id}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))};
      return (
          <div>
            <hr />
            <div className="bounds">
            {courseModules}  
              <div className="grid-33">
                <Link className="course--module course--link" to="/courses/create">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                    </svg>New Course</h3>
                </Link></div>
            </div>
          </div>
      );
  }
};

export default Courses;