import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component { // setup empty courses array and empty users array
    constructor(props){
      super(props)
      this.state = {
        isLoading: true,
        courses: [], //course: ??
        user: []    //users: ??
      };
      this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() { //retrieves detail for a course from the REST API's /api/courses/:id route 
        const {
            match: { params }
        } = this.props;
         
        axios.get(`http://localhost:5000/api/courses/${params.id}`)
        .then (res => {

          const courseData = res.data.coursesById;

          this.setState({
            isLoading: false,
            userId: parseInt(courseData.userId),
            title: courseData.title,
            author: courseData.User.firstName,
            description: courseData.description,
            estimatedTime: courseData.estimatedTime,
            materialsNeeded: courseData.materialsNeeded 
          });
        })
        .catch (err => {
            if (err) {
                const { history } = this.props;
                history.push("/notfound");
            }
        });
    }

    handleDelete = (e) => {
        const {
            match: { params },
            history
          } = this.props;

        e.preventDefault();
        axios.delete(`http://localhost:5000/api/courses/${params.id}`, {
            auth: {
                username: window.localStorage.getItem("emailAddress"), //"Email?"
                password: window.localStorage.getItem("password")
            },
            data: {
                id: this.state.courseId
            }
        })
        .then(() => {
          history.push("/");
        })
        .catch(() => {
          history.push("/error");
        });
    };


    render() {
        if (this.state.isLoading) {
          return <h1>Loading....</h1>;
        }

        return(
            <div>
              <div className="actions--bar">
                <div className="bounds">
                   <div className="grid-100">
                      {parseInt (this.state.useId) ===
                      parseInt(localStorage.getItem("id")) ? (
                        <span> {/*Update Course Button  // followed by Delete Course Button*/}
                          <Link className="button" to={"/courses/"+this.state.course.id+"/update"}>Update Course</Link>
                          <button className="button" onClick={e => this.handleDelete(e, localStorage.getItem("username"), localStorage.getItem("password"))}>Delete Course</button>
                        </span>
                      ) : (
                        ""
                      )}
                           <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
              </div>
                    <div className="bounds course--detail">
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <h3 className="course--title">{this.state.title}</h3>
                          <p>By {this.state.author}</p>
                        </div>
                      </div>
                    </div>

                      <div className="course--description">
                          <ReactMarkdown source={this.state.description} />
                      </div>

                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                  <h4>Estimated Time</h4>
                                  <h3>{this.state.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                  <h4>Materials Needed</h4>
                                  <ul>
                                    <ReactMarkdown source={this.state.materialsNeeded}/>
                                  </ul>
                                </li>
                          </ul>
                        </div>
                      </div>
                    </div>
        )}
}

export default CourseDetail;