import React, { useState, useEffect } from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { course } from "./propTypes";
import { toast } from "react-toastify";

function ManageCourse( {courses, loadCourses, match}) {
  const [ course, setCourse ] = useState({
    title: "",
    authorId: null,
    category: ""
  });
  const [ redirectToCoursesPage, setRedirectToCoursesPage ] = useState(false);

  useEffect(() => {
      const { slug } = match.params;
    if (slug) {
      if (!props.courses.length) {
      const course = courses.find(course => course.slug === slug);
      setCourse();
    } else {

    }
  }, [courses, loadCourses, match.params]);

  function handleChange(event) {
    const newCourse = { ...course };
    newCourse[event.target.name] =
      event.target.name === "authorId"
        ? parseInt(event.target.value, 10) //remind JS the Int is base-10, don't accidentally interpret as Hex.
        : event.target.value;
    setState({ newCourse });
  };

  // Hipster.js
  //   handleChange = ({ target }) => {
  //     const course = {
  //       ...this.state.course,
  //       [target.name]: target.value
  //     };
  //     this.setState({ course });
  //   };

  function handleSubmit(event) {
    event.preventDefault(); // hey browser, don't post back.
    saveCourse(state.course).then(() => {
      //save completed
      this.props.loadCourses();
      SetRedirectToCoursesPage(true);
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
