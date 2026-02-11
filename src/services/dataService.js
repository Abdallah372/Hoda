import coursesData from "../data/courses.json";
import lessonsData from "../data/lectures.json";
import instructorsData from "../data/instructors.json";
import categoriesData from "../data/categories.json";
import booksData from "../data/books.json";
import shortsData from "../data/shorts.json";

// In-memory Simulation
let coursesStore = [...coursesData];
let lessonsStore = [...lessonsData];

/**
 * Data Mapping Layer
 * Converts Raw DB Entities -> UI View Models
 */
const mapCourseToViewModel = (course) => {
  const instructor = instructorsData.find((i) => i.id === course.instructorId);
  const category = categoriesData.find((c) => c.id === course.categoryId);
  const lessons = lessonsStore
    .filter((l) => l.courseId === course.id)
    .sort((a, b) => a.index - b.index);

  return {
    ...course,
    instructorName: instructor?.name || "غير معروف",
    instructorImage: instructor?.image || "/default-avatar.png",
    categoryTitle: category?.title || "عام",
    categoryColor: category?.color || "gray",
    lessons,
    lessonsCount: lessons.length, // Computed
    isNew:
      new Date(course.createdAt) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Logic example
  };
};

export const dataService = {
  getAllCourses: (options = {}) => {
    let result = coursesStore.map(mapCourseToViewModel);

    // Apply Filters logic here if needed (simulating DB query)
    if (options.filter) {
      // ... existing filter logic
    }

    return result;
  },

  getCourseById: (id) => {
    const course = coursesStore.find((c) => c.id === id);
    if (!course) return null;
    return mapCourseToViewModel(course);
  },

  getAllInstructors: () => instructorsData,

  getInstructorById: (id) => instructorsData.find((i) => i.id === id),

  // Centralized Search Logic
  search: (query) => {
    const lowerQuery = query.toLowerCase();
    return {
      courses: coursesStore
        .filter((c) => c.title.toLowerCase().includes(lowerQuery))
        .map(mapCourseToViewModel),
      // ... other entities
    };
  },

  getAllShorts: () => shortsData,

  getAllLectures: () => {
    return lessonsStore.map((lesson) => {
      const course = coursesStore.find((c) => c.id === lesson.courseId);
      return {
        ...lesson,
        courseTitle: course?.title,
        thumbnail: course?.thumbnail,
      };
    });
  },

  getAllBooks: () => booksData,
};
