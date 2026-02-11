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

      // Robust ID finding logic to handle:
      // 1. String vs Number mismatches ("5" vs 5)
      // 2. Legacy prefix mismatches ("cw-5" vs "5")
      const idx = lessons.findIndex((l) => {
        // 1. Direct match (strict)
        if (l.id === lessonId) return true;
        // 2. Loose match (string "5" == number 5)
        // eslint-disable-next-line eqeqeq
        if (l.id == lessonId) return true;
        // 3. Legacy prefixes (e.g. data has "cw-5" but URL is "5")
        if (String(l.id) === `cw-${lessonId}`) return true;
        if (String(l.id) === `dd-${lessonId}`) return true;
        return false;
      });

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
