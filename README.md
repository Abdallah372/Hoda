# Hoda - Modern Islamic Learning Platform

## Architecture Overview

This project has been re-architected to support a scalable, view-only learning methodology inspired by modern streaming platforms (YouTube/TikTok) but strictly for educational content.

### Data Layer (`src/data/`)

The data has been decoupled into normalized entities to support future migration to a backend (Firebase/Supabase):

- **`courses.json`**: Metadata for courses (Instructor, Category, Playlist ID).
- **`lectures.json`**: Flat list of all educational videos/lessons, linked to Courses.
- **`books.json`**: library content (PDF URLs and future text content).
- **`shorts.json`**: Short-form educational content.
- **`videos.json`**: (Future) Video specific metadata.

### Service Layer (`src/services/dataService.js`)

A unified data access layer that:

1.  **Joins Data**: Combines Courses with their Lectures at runtime.
2.  **Filters**: Handles search and category filtering.
3.  **Abstracts Source**: The UI components do not know if data comes from JSON or an API.

### UX/UI Philosophy

- **Immersive**: Full-screen layouts, collapsible sidebars.
- **Focus**: No social distractions (comments/likes removed), "Zen Mode" text viewers.
- **Modern**: Glassmorphism, dark mode support, smooth transitions.

## Key Features

1.  **Split-Screen Lesson Viewer**:
    - Watch video and read text simultaneously.
    - Adjustable font size and line width for the text viewer.
    - PDF fallback.
    - Local notes with export.

2.  **Shorts**:
    - Vertical scrolling interface for short benefits.
    - Deep linking to full courses.

3.  **Video Library**:
    - YouTube-style grid view.
    - Client-side search.

## Tech Stack

- React 19
- Tailwind CSS v4
- React Router 7
- Lucide React (Icons)
"# Hoda" 
