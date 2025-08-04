
---

## 📄 2️⃣ **DOCUMENTATION.md**
```markdown
# MovieMate - Project Documentation

## 1. Project Overview
MovieMate is a fullstack application that allows users to manage a list of movies they've watched or plan to watch. Users can add movies with details, filter & sort them, and delete movies from the list.

---

## 2. Architecture Diagram
Frontend (React.js) <--> Backend API (Flask) <--> Database (SQLite)

- React sends requests via Fetch API.
- Flask handles API routes (GET, POST, DELETE).
- SQLite stores movie records.

---

## 3. Data Flow
1. User submits movie details in the frontend.
2. Data is sent to Flask API via POST request.
3. Flask stores the data in SQLite DB.
4. Movies are fetched via GET request and displayed in React.
5. Filtering/Sorting is handled client-side.
6. Delete requests remove movies from DB & UI updates.

---

## 4. Technologies Used
- React.js (Functional Hooks)
- Python Flask (Backend API)
- SQLite (Database)
- Manual CSS Styling (Responsive Layout)

---

## 5. Features Implemented
- Add Movies with fields (Title, Director, Genre, Platform, Status, Rating, Review)
- Show Movie List dynamically on click.
- Filter by Genre/Platform/Status.
- Sort by Title A-Z/Z-A and Rating High/Low.
- Delete functionality.
- Conditional rendering of UI sections (List/Filter toggle).

---

## 6. Possible Enhancements
- AI-based Recommendations based on user watch history.
- Auto-Generate Movie Reviews using OpenAI API.
- User Authentication & Personalized Watchlist.
- Deploy Frontend (Vercel) & Backend (Render/Railway).

---

## 7. How to Run
See README.md for setup instructions.
