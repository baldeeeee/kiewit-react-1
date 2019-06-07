import React, { useState, useEffect } from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { course } from "./propTypes";
import { toast } from "react-toastify";
import TextInput from "./shared/TextInput/TextInput";

// Hoist funcs that don't need props or state outside of your functions.
// https://overreacted.io/a-complete-guide-to-useeffect/#tldr
function getCourseBySlug(courses, slug) {
  const course = courses.find(course => course.slug === slug);
  return course;
}

function ManageCourse({ courses, loadCourses, match }) {
  const [course, setCourse] = useState({
    title: "",
    authorId: null,
    category: ""
  });

  const [errors, setErrors] = useState({});
  const [redirectToCoursesPage, setRedirectToCoursesPage] = useState(false);

  // useEffect(() => {
  //   async function loadCourseData() {
  //     const { slug } = match.params;
  //     if (courses.length === 0) {
  //       const _courses = await loadCourses();
  //       setCourse(getCourseBySlug(_courses, slug));
  //     } else {
  //       setCourse(getCourseBySlug(courses, slug));
  //     }
  //   }
  //   loadCourseData();
  // }, [courses, loadCourses, match.params]);

  // Promises version of above
  useEffect(() => {
    const { slug } = match.params;
    if (slug) {
      if (courses.length === 0) {
        loadCourses().then(_courses => {
          setCourse(getCourseBySlug(_courses, slug));
        });
      } else {
        setCourse(getCourseBySlug(courses, slug));
      }
    }
  }, [courses, loadCourses, match.params]);

  function handleChange(event) {
    const newCourse = { ...course };
    newCourse[event.target.name] =
      event.target.name === "authorId"
        ? parseInt(event.target.value, 10) //remind JS the Int is base-10, don't accidentally interpret as Hex.
        : event.target.value;
    setCourse(newCourse);
  }

  // Hipster.js
  //   handleChange = ({ target }) => {
  //     const course = {
  //       ...course,
  //       [target.name]: target.value
  //     };
  //     setCourse({ course });
  //   };

  function isValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title required.";
    if (!course.authorId) _errors.authorId = "Author ID required.";
    if (!course.category) _errors.category = "Category required.";

    //if errors is still an empty object, then return true.
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault(); // hey browser, don't post back.
    if (!isValid()) return;
    saveCourse(course).then(() => {
      // load courses again so that the saved record is reflected on the courses page
      loadCourses();
      setRedirectToCoursesPage(true);
      toast.success("Course saved! 🎉");
    });
  }

  if (redirectToCoursesPage) return <Redirect to="/courses" />;

  return (
    <>
      <h1>Manage Course</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          id="title"
          name="title"
          onChange={handleChange}
          value={course.title}
          error={errors.title}
        />

        <TextInput
          title="Author Id"
          id="authorId"
          name="authorId"
          onChange={handleChange}
          value={course.authorId || ""}
          error={errors.authorId}
        />

        <TextInput
          title="category"
          id="category"
          name="category"
          onChange={handleChange}
          value={course.category}
          error={errors.category}
        />

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </>
  );
}

ManageCourse.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};

export default ManageCourse;
