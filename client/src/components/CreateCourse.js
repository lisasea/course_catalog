import React, {Component} from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

class CreateCourse extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",       
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        userId: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }   

    handleInputChange = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
      e.preventDefault();
      axios.post("http://localhost:5000/api/courses/", { // `http://localhost:5000/api/courses/`${params.id} ??
        auth: {
            username: window.localStorage.getItem("emailAddress"), //"Email?"
            password: window.localStorage.getItem("password")
        },
        data: {
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded
        }
      })
        .then(alert("New course created!")) 
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
           this.props.history.push("/error");
        });  
    };

    render() {
        const { /*title, description, estimatedTime, materialsNeeded,*/ validationErrors } = this.state;
        return (
            <div className="bounds course--detail">
              <h1>Create Course</h1>
                  <div>
                    {validationErrors?(
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{validationErrors}</li>
                                </ul>
                            </div>
                        </div>
                    ):""}
                  <form onSubmit={this.handleSubmit}>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>{" "}
                        <div>
                          <input
                            value={this.state.title}
                            onChange={e => this.handleInputChange(e)}
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            placeholder="Course title..."
                          />
                        </div>
                        <p>{localStorage.user}</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            value={this.state.description}
                            onChange={e => this.handleInputChange(e)}
                            id="description"
                            name="description"
                            placeholder="Course description..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                value={this.state.estimatedTime}
                                onChange={e => this.handleInputChange(e)}
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                value={this.state.materialsNeeded}
                                onChange={e => this.handleInputChange(e)}
                                id="materialsNeeded"
                                name="materialsNeeded"
                                placeholder="List materials..."
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">
                        Create Course
                      </button>
                      <Link to="/" className="button button-secondary">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
        );
    }
}

export default CreateCourse;
//This component provides the "Create Course" screen
// rendering a form 
//  that allows a user to create a new course
// also renders a "Create Course" button t
// when clicked sends a POST request to the REST API's /api/courses route
// also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
