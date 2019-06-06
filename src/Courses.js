import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { course } from "./propTypes";
import { Link } from "react-router-dom";

function Courses({ courses, loadCourses, deleteCourse }) {
  useEffect(() => {
    if (courses.length === 0) loadCourses();
    //this code will ryn when the component unmounts.
    return () => console.log("unmounting courses component");
  }, [courses, loadCourses]);

  return (
    <>
      <h1>Courses</h1>
      <Link to="managecourse" className="btn btn-primary">
        Add Course
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>
                <button onClick={() => deleteCourse(course.id)}>Delete</button>
              </td>
              <td>{course.id}</td>
              <td>
                <Link to={"managecourse/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};

export default Courses;
