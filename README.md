# Hotel Booking App

A full-stack hotel booking application built as a diploma project.
Users can browse available rooms by date and category, create bookings, and manage reservations.
Authentication is handled via JWT stored in HTTP-only cookies.

---

## Features

- User registration & login
- Secure authentication using HTTP-only cookies
- Browse rooms with availability filtering by date and category
- Pagination of available rooms and reservations
- Create and manage room bookings
- Admin room creation and editing with image upload
- Image upload with size/type validation
- Global state management using Redux Toolkit
- RESTful API architecture

---

## Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit (global state management)
- React Redux
- Axios
- React Router

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- Multer

---

## Architecture Overview

- **Frontend** communicates with the backend via a REST API
- Global application state (authentication, rooms, reservations, pagination) is managed using Redux Toolkit
- Authentication uses **JWT stored in HTTP-only cookies**
- Availability filtering is performed **in MongoDB** to ensure correct pagination
- Bookings are embedded inside Room documents for simpler availability queries
- Axios uses a single configured client with `withCredentials: true`
- Environment-based configuration for cookies and CORS

---

## Getting Started

### Prerequisites

- Node.js (v18+ )
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/filants/hotel-booking-app.git
cd hotel-booking-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

- Frontend runs on http://localhost:5173
- Backend runs on http://localhost:3001

## Author

**Antons Filipovs**  
Junior Full-Stack / React Developer
LinkedIn: https://www.linkedin.com/in/antons-filipovs/
