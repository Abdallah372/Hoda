const getStorageKey = (courseId) => `progress_course_${courseId}`;

export const progressService = {
  getCompletedLessons: (courseId) => {
    try {
      const saved = localStorage.getItem(getStorageKey(courseId));
      if (!saved) return [];
      return JSON.parse(saved).completedLessons || [];
    } catch (e) {
      return [];
    }
  },

  saveCompletion: (courseId, lessonId) => {
    const completed = progressService.getCompletedLessons(courseId);
    if (completed.includes(lessonId)) return completed;
    const newCompleted = [...completed, lessonId];
    localStorage.setItem(getStorageKey(courseId), JSON.stringify({ completedLessons: newCompleted }));
    return newCompleted;
  },

  calculatePercent: (completedCount, total) => {
    if (total === 0) return 0;
    return Math.round((completedCount / total) * 100);
  }
};
