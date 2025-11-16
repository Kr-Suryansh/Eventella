# Configuration & Packages Guide

Some files (like `package.json`) cannot contain comments. This guide explains their key fields and environment variables.

## Server `package.json`
- `name`, `version`, `private`: metadata
- `scripts`:
  - `start`: `node server.js` (production)
  - `dev`: `nodemon server.js` (development reload)
  - `seed`: run `seeder.js` to seed data
- `dependencies`:
  - `express`: HTTP server
  - `mongoose`: MongoDB ODM
  - `jsonwebtoken`, `bcryptjs`: auth
  - `cors`, `dotenv`: cross-origin config, env vars
  - others per project
- `devDependencies`:
  - `nodemon`: auto-restart on changes

## Client `package.json`
- `scripts`:
  - `dev`: start Vite dev server
  - `build`: production build to `dist`
  - `preview`: preview production build locally
- `dependencies`:
  - `react`, `react-dom`: UI
  - `react-router-dom`: routing
  - `axios`: HTTP client
  - `tailwindcss` + `postcss` + `autoprefixer`: styling pipeline
- `devDependencies`: Vite, plugins, tooling

## Environment Variables

### Server (`server/.env`)
- `PORT`: API port (default often 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret to sign JWT tokens

### Client (`client/.env`)
- `VITE_API_BASE_URL`: Base URL of the server API (e.g., `http://localhost:5000/api`)

Note: Vite only exposes variables prefixed with `VITE_` to the client bundle.
