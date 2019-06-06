import React from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { course } from "./propTypes";
import { toast } from "react-toastify";

class ManageCourse extends React.Component {
  state = {
    course: {
      title: "",
      authorId: null,
      category: ""
    },
    redirectToCoursesPage: false
  };

  async componentDidMount() {
    const { slug } = this.props.match.params;
    if (slug) {
      if (!this.props.courses.length) await this.props.loadCourses();
      const course = this.props.courses.find(course => course.slug === slug);
      this.setState({ course });
      // 3. get course info.
    }
    debugger;
  }

  // this.handleTitleChange = this.handleTitleChange.bind(this);
  //}
  handleChange = event => {
    const newCourse = { ...this.state.course };
    newCourse[event.target.name] =
      event.target.name === "authorId"
        ? parseInt(event.target.value, 10) //remind JS the Int is base-10, don't accidentally interpret as Hex.
        : event.target.value;
    this.setState({ course: newCourse });
  };

  // Hipster.js
  //   handleChange = ({ target }) => {
  //     const course = {
  //       ...this.state.course,
  //       [target.name]: target.value
  //     };
  //     this.setState({ course });
  //   };

  handleSubmit = event => {
    event.preventDefault(); // hey browser, don't post back.
    saveCourse(this.state.course).then(() => {
      //save completed
      this.props.loadCourses();
      this.setState({ redirectToCoursesPage: true });
      toast.success("😊 Course saved.");
    });
  };

  render() {
    if (this.state.redirectToCoursesPage) return <Redirect to="/courses" />;

    return (
      //{this.state.redirectToCoursesPage && <Redirect to="courses" />}

      <>
        <h1>Manage Course</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              id="title"
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.course.title}
            />
          </div>

          <div>
            <label htmlFor="authorId">Author Id</label>
            <br />
            <input
              id="authorId"
              type="text"
              name="authorId"
              onChange={this.handleChange}
              value={this.state.course.authorId || ""}
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <br />
            <input
              id="category"
              type="text"
              name="category"
              onChange={this.handleChange}
              value={this.state.course.category}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </>
    );
  }
}

ManageCourse.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};

export default ManageCourse;
