import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

export const useLesson = (courseId, lessonId) => {
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    try {
      const foundCourse = dataService.getCourseById(courseId);
      if (!foundCourse) {
        setError("الدورة غير موجودة");
        setLoading(false);
        return;
      }

      const lessons = foundCourse.lessons || [];
      const idx = lessons.findIndex((l) => l.id === lessonId);

      if (idx !== -1) {
        setCourse(foundCourse);
        setLesson(lessons[idx]);
        setPrevLesson(idx > 0 ? lessons[idx - 1] : null);
        setNextLesson(idx < lessons.length - 1 ? lessons[idx + 1] : null);
      } else {
        setError("الدرس غير موجود");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }, [courseId, lessonId]);

  return { course, lesson, prevLesson, nextLesson, loading, error };
};
