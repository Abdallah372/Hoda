import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Course from "../pages/Course";
import Lesson from "../pages/Lesson";
import Videos from "../pages/Videos";
import Shorts from "../pages/Shorts";
import Lectures from "../pages/Lectures";
import Books from "../pages/Books";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/videos" element={<Videos />} />
    <Route path="/shorts" element={<Shorts />} />
    <Route path="/lectures" element={<Lectures />} />
    <Route path="/books" element={<Books />} />
    <Route path="/course/:id" element={<Course />} />
    <Route path="/lesson/:courseId/:lessonId" element={<Lesson />} />
  </Routes>
);

export default AppRoutes;
