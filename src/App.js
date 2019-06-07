import React, { useState, Suspense } from "react";
import Home from "./Home";
import Nav from "./Nav";
import { Route, Switch } from "react-router-dom";
import ManageCourse from "./ManageCourse";
import * as courseApi from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./UserContext";
import PageNotFound from "./PageNotFound";
import Spinner from "./shared/Spinner";

// Lazy import
const Courses = React.lazy(() => import("./Courses"));

const App = () => {
  const [courses, setCourses] = useState([]);
  const userState = useState({
    id: 1,
    email: "cory@reactjsconsulting.com"
  });

  // Above is equivalent to this:
  // const courseState = useState([]);
  // const courses = courseState[0];
  // const setCourses = courseState[1];

  function loadCourses() {
    return courseApi
      .getCourses()
      .then(courses => {
        setCourses(courses);
        return courses;
      })
      .catch(error =>
        toast.error(
          "⚠ Sorry, courses failed to load 😳. Please reload and try again. Error:" +
            error.message
        )
      );
  }

  async function deleteCourse(courseId) {
    try {
      // Optimistic delete.
      setCourses(courses.filter(course => course.id !== courseId));
      toast.success("💥 Course deleted.");
      await courseApi.deleteCourse(courseId);
    } catch (error) {
      toast.error(
        "Sorry, delete failed 😡. Please reload and try again. Error:" +
          error.message
      );
    }
  }

  return (
    <UserContext.Provider value={userState}>
      <ToastContainer />
      <Nav />
      <Suspense fallback={Spinner}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/courses"
            render={props => (
              <Courses
                loadCourses={loadCourses}
                deleteCourse={deleteCourse}
                courses={courses}
                {...props}
              />
            )}
          />
          <Route
            path="/course/:slug?"
            render={props => (
              <ManageCourse
                {...props}
                loadCourses={loadCourses}
                courses={courses}
              />
            )}
          />
          <Route path="/404" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
