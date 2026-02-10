import { useState, useEffect, useCallback } from 'react';
import { progressService } from '../services/progressService';

export const useCourseProgress = (courseId, lessons = []) => {
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (courseId) {
      setCompletedLessons(progressService.getCompletedLessons(courseId));
    }
  }, [courseId]);

  const markCompleted = useCallback((lessonId) => {
    if (!courseId || !lessonId) return;
    const updated = progressService.saveCompletion(courseId, lessonId);
    setCompletedLessons(updated);
  }, [courseId]);

  const total = lessons ? lessons.length : 0;
  const completedCount = completedLessons.length;
  const progressPercent = progressService.calculatePercent(completedCount, total);

  return { progressPercent, completedCount, total, completedLessons, markCompleted };
};
