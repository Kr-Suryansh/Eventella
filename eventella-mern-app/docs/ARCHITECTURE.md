# Eventella MERN Architecture Overview

This document gives a high-level picture of the codebase to complement the in-file comments added across server and client.

## High Level
- Stack: MongoDB + Express + React + Node (MERN)
- Two apps:
  - `server/`: REST API (auth, events, bookings)
  - `client/`: React SPA (Vite + Tailwind)

## Server (Node/Express)
- `server.js`: Express app bootstrap, middleware, routes, error handling
- `config/db.js`: MongoDB connection via Mongoose
- `routes/`: Route definitions mapping HTTP paths to controllers
  - `auth.js`: login/register
  - `events.js`: CRUD for events
  - `bookings.js`: bookings for events
- `controllers/`: Request handlers (business logic)
  - `authController.js`: register, login, profile
  - `eventController.js`: list, details, admin create/update/delete
  - `bookingController.js`: create booking, get bookings
- `middleware/authMiddleware.js`: JWT auth, admin check
- `models/`: Mongoose schemas
  - `User.js`, `Event.js`, `Booking.js`
- `utils/generateToken.js`: Sign JWT
- `data/events.js` + `seeder.js`: Dev data seeding

## Client (React + Vite)
- `main.jsx`: App entry
- `App.jsx`: Router and top-level layout
- `context/AuthContext.jsx`: Authentication state + provider
- `hooks/`: Reusable hooks
  - `useAuth.js`: Access auth context
  - `useDebounce.js`: Debounce utility
- `api/`: API clients (axios instance + endpoints)
  - `api.js`: axios base with interceptors
  - `auth.js`, `events.js`, `bookings.js`: API wrappers
- `components/`: UI building blocks (cards, forms, routes, layout)
- `pages/`: Route views (Home, Login, Register, Dashboard, Admin, etc.)

## Data Flow
1. React pages/components call `api/*` functions
2. axios instance attaches auth token (if present)
3. Express receives request -> middleware (auth) -> controller
4. Controller interacts with Mongoose models
5. Response returned to client -> state update -> UI renders

## Auth Flow
- Register/Login returns JWT; stored (likely in localStorage)
- axios sends token in `Authorization: Bearer <token>`
- Protected routes guarded by `ProtectedRoute`/`AdminRoute` + server-side auth middleware

## Environments
- `server/.env`: `MONGO_URI`, `JWT_SECRET`, `PORT`
- `client/.env`: `VITE_API_BASE_URL` (Vite exposes only variables prefixed with `VITE_`)

## Styling and Build
- TailwindCSS configured in `tailwind.config.js` + PostCSS
- Vite dev server and bundling via `vite.config.js`

## Suggested Reading Order
1. Server: `server.js` -> `config/db.js` -> `models/*` -> `routes/*` -> `controllers/*` -> `middleware/*`
2. Client: `main.jsx` -> `App.jsx` -> `context/AuthContext.jsx` -> `api/api.js` -> `components/*` -> `pages/*`

