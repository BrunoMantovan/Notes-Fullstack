# Ensolvers Notes App

This is a simple notes app built for the Ensolvers challenge. It has a React frontend and a Node.js/Express backend with MongoDB for storage.

---

## Requirements

- Node.js **18.17.0** or newer  
- npm **9.0.0** or newer  
- MongoDB **6.0** or newer (local or Atlas)
- Bash or Zsh shell (for the setup script)

---

## How to Run

1. **Clone this repo** and go into the project folder.

2. **Start MongoDB** (locally or make sure your Atlas URI is in `backend/.env`).

3. **Run the setup script:**
   ```sh
   ./start.sh
   ```
   This will install everything and start both the backend and frontend.  
   The frontend will be available at [http://localhost:5173].

---

## Project Structure

- `backend/` — Express API and MongoDB models
- `frontend/` — React app (Vite)
- `start.sh` — Script to install and run everything

---

## Main Tools & Versions

- Node.js: 18.17+
- npm: 9+
- MongoDB: 6+
- Express: 5+
- Mongoose: 8+
- React: 19+
- Vite: 7+
- concurrently: 8+

---

## Environment Variables

The backend uses a `.env` file for config. Example:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ensolvers
```

If you use MongoDB Atlas, update `MONGODB_URI` accordingly.

---