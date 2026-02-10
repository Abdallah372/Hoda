import coursesData from "../data/courses.json";
import lecturesData from "../data/lectures.json";
import booksData from "../data/books.json";
import shortsData from "../data/shorts.json";
import videosData from "../data/videos.json"; // Optional/Future

export const dataService = {
  getAllCourses: () => {
    return coursesData.map((course) => {
      const courseLectures = lecturesData.filter(
        (l) => l.courseId === course.id,
      );
      return {
        ...course,
        lessonsCount: courseLectures.length,
        book: booksData.find((b) => b.id === course.bookId),
      };
    });
  },

  getCourseById: (id) => {
    const course = coursesData.find((c) => c.id === id);
    if (!course) return null;

    const lessons = lecturesData
      .filter((l) => l.courseId === id)
      .sort((a, b) => a.index - b.index);

    const book = booksData.find((b) => b.id === course.bookId);

    return {
      ...course,
      lessons,
      book,
    };
  },

  getAllLectures: () => {
    return lecturesData.map((lecture) => {
      const course = coursesData.find((c) => c.id === lecture.courseId);
      return {
        ...lecture,
        courseTitle: course?.title,
        thumbnail: course?.thumbnail,
        courseId: course?.id,
      };
    });
  },

  getAllShorts: () => {
    return shortsData;
  },

  getShortById: (id) => {
    return shortsData.find((s) => s.id === id);
  },

  search: (query) => {
    const lowerQuery = query.toLowerCase();

    const courses = coursesData
      .filter(
        (c) =>
          c.title.includes(query) ||
          c.instructor.includes(query) ||
          c.description.includes(query),
      )
      .map((c) => ({ type: "course", ...c }));

    const lectures = lecturesData
      .filter((l) => l.title.includes(query))
      .map((l) => ({ type: "lecture", ...l }));

    const books = booksData
      .filter((b) => b.title.includes(query) || b.author.includes(query))
      .map((b) => ({ type: "book", ...b }));

    return [...courses, ...lectures, ...books];
  },
};
