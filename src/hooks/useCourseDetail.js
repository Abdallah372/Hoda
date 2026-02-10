import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

export const useCourseDetail = (id) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    try {
      const data = dataService.getCourseById(id);
      if (data) {
        setCourse(data);
      } else {
        setError("الدورة غير موجودة");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل الدورة");
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { course, loading, error };
};
