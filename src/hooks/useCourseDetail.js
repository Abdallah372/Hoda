import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

export const useCourseDetail = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = () => {
      try {
        const data = dataService.getCourseById(courseId);
        if (data) {
          setCourse(data);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
};
