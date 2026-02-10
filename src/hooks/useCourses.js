import { useState, useEffect, useCallback } from "react";
import { dataService } from "../services/dataService";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate slight loading for smoother transition
    const timer = setTimeout(() => {
      try {
        const data = dataService.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError("فشل تحميل الدورات");
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { courses, loading, error };
};
