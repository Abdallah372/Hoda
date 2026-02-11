# Hoda SaaS - Production Data Architecture

This document outlines the professional data structure and best practices implemented for the Hoda platform.

## 1. Core Philosophy: Relational Integrity & Scalability

We have moved away from a nested JSON structure to a relational model. This mimics a production database (SQL/NoSQL) and ensures:

- **Zero Redundancy**: An instructor's name is stored in one place (`instructors.json`). If updated, it reflects everywhere.
- **Scalability**: Courses and Lectures are decoupled. You can have millions of lectures without bloating the course object.
- **Type Safety**: IDs are strings, Counts are numbers, Dates are ISO strings.

---

## 2. Entity Relationships (ERD)

### `Category` (categories.json)

The root taxonomy.

- `id`: Unique Slug (e.g., `aqidah`)
- `title`: Display Name
- `color`: UI Theme Color

### `Instructor` (instructors.json)

The content creator.

- `id`: Unique Slug (e.g., `saleh-al-fawzan`)
- `name`: Full Name
- `bio`: Short Biography
- `image`: URL to profile picture

### `Course` (courses.json)

The container for learning material.

- `id`: Unique Slug (e.g., `course-usul-thalatha`)
- `title`: Course Title
- `instructorId`: **Foreign Key** -> `Instructor.id`
- `categoryId`: **Foreign Key** -> `Category.id`
- `level`: Enum (`beginner`, `intermediate`, `advanced`)
- `lessonsCount`: Cached count for performance

### `Lecture` (lectures.json)

The actual content unit.

- `id`: Unique ID (e.g., `ut-1`)
- `courseId`: **Foreign Key** -> `Course.id`
- `index`: Sort Order (0, 1, 2...)
- `title`: Lecture Title
- `videoUrl`: URL or ID

---

## 3. Data Integrity Rules

1. **Foreign Key Constraint**: A `course` MUST have a valid `instructorId` that exists in `instructors.json`.
2. **Cascading Delete**: If a `course` is deleted, ALL its `lectures` must be deleted automatically.
3. **Immutability**: IDs (`id`) should never change once created. Titles and descriptions can change.
4. **Validation**: All new entries must be validated against the schema before insertion.

---

## 4. How to Add New Content

### Step 1: Create the Course

Add to `courses.json`:

```json
{
  "id": "new-course-id",
  "title": "New Course Title",
  "instructorId": "existing-instructor-id",
  "categoryId": "existing-category-id",
  "level": "beginner",
  "createdAt": "2024-05-20T10:00:00Z"
}
```

### Step 2: Add Lessons

Add to `lectures.json` (Order doesn't matter, `index` determines sort):

```json
{
  "id": "lesson-1",
  "courseId": "new-course-id", // Links to the course above
  "index": 0,
  "title": "Introduction"
},
{
  "id": "lesson-2",
  "courseId": "new-course-id",
  "index": 1,
  "title": "Chapter 1"
}
```

---

## 5. API / Service Layer Best Practices

We use a **Data Access Layer (DAL)** pattern in `dataService.js`.

- **Never access JSON files directly in components.** Always use `dataService`.
- **Hydration**: The service automatically "joins" tables. `getCourseById` returns the course WITH its instructor and lessons attached.
- **Fail Fast**: The service throws errors if required fields are missing during write operations.

## 6. Future Migration Guide

To migrate to **PostgreSQL**:

1. Create tables `instructors`, `categories`, `courses`, `lectures`.
2. Valid JSON files -> `INSERT INTO` SQL statements.
3. Replace `dataService.js` logic with `fetch('/api/courses')`.
   **The Frontend code will NOT need to change.**

To migrate to **MongoDB**:

1. Create collections.
2. Direct JSON import.
3. Replace `dataService.js` with Mongoose queries.
