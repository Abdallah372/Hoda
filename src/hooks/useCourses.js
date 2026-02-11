import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

/**
 * useCourses Hook
 * The ONLY responsibility is to facilitate Data Fetching to UI.
 * Does NOT manipulate Data.
 */
export const useCourses = (options = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = () => {
      try {
        const data = dataService.getAllCourses(options);
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error("Data Service Error:", err);
        setError("تعذر تحميل البيانات. يرجى المحاولة لاحقاً.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(options)]); // Smart dependency tracking

  return {
    courses,
    loading,
    error,
  };
};
