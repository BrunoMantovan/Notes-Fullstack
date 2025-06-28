#!/bin/bash
# filepath: ./start.sh

set -e

echo "Installing backend dependencies..."
cd backend
npm install

if [ ! -f .env ]; then
  echo "PORT=3000" > .env
  echo "MONGODB_URI=mongodb+srv://brunochupetin1:1oWkY7i29erXIXtE@notesdb.bmr3tey.mongodb.net/?retryWrites=true&w=majority&appName=NotesDB" >> .env
  echo "Created backend/.env file with default values."
fi

cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing 'concurrently' globally if not present..."
npm list -g concurrently || npm install -g concurrently

echo "You can access the frontend at http://localhost:5173"
open http://localhost:5173 2>/dev/null || xdg-open http://localhost:5173 2>/dev/null || echo "Please open http://localhost:5173 in your browser."

echo "Starting backend and frontend..."
concurrently "cd backend && npm run serve" "cd frontend && npm run dev"