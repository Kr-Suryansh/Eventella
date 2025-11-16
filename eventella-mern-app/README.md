# 🎟️ Eventella - MERN Event Booking App

This is a full-stack MERN (MongoDB, Express, React, Node.js) web application for booking events, inspired by BookMyShow.

## Features

-   **User Authentication:** JWT-based login/register (Email & Password).
-   **Role-Based Access:** `user` and `admin` roles.
-   **Event Management (Admin):** Admins can Create, Read, Update, and Delete events.
-   **Event Browsing:** Users can browse and filter events by category and location.
-   **Booking Flow:** Users can select seats, book events, and see a (simulated) confirmation.
-   **User Dashboard:** Users can view and cancel their bookings.
-   **Admin Dashboard:** Admins can manage all events and view all user bookings.

## Tech Stack

-   **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
-   **Backend:** Node.js, Express.js, Mongoose
-   **Database:** MongoDB
-   **Authentication:** JSON Web Tokens (JWT)

---

## 🚀 How to Run

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [MongoDB](https://www.mongodb.com/try/download/community) (local instance or a cloud-hosted URI, e.g., from MongoDB Atlas)

---

### 1. Backend Setup (`server`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory. Copy the contents of `.env.sample` and fill in your values.
    ```env
    # Server Port (Set to 9460 as requested)
    PORT=9460

    # Your MongoDB Connection String
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/eventella?retryWrites=true&w=majority

    # Your JWT Secret Key
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Seed the database with sample data:**
    This will create sample events and two users (admin/user).
    ```bash
    npm run data:import
    ```
    -   **Admin User:** `admin@eventella.com` (Password: `password123`)
    -   **Sample User:** `user@eventella.com` (Password: `password123`)

5.  **Start the backend server:**
    ```bash
    npm run server
    ```
    Your backend will be running at `http://localhost:9460`.

---

### 2. Frontend Setup (`client`)

1.  **Open a new terminal** and navigate to the client directory:
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `client` directory. Copy the contents of `.env.sample`. The URL should match your backend port (9460).
    ```env
    VITE_API_URL=http://localhost:9460/api
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app in your browser:**
        Vite will provide you with a URL, typically `http://localhost:5173`.

---

## 📚 Documentation & Code Comments

- In-file comments have been added throughout both `server/` and `client/` to explain:
    - What each module does and how it connects to others
    - Purpose of key variables, handlers, middleware, and components
    - API routes and expected request/response shapes
- High-level documents:
    - `docs/ARCHITECTURE.md` — overview of modules, flows, and structure
    - `docs/CONFIG_GUIDE.md` — explains `package.json` scripts and `.env` variables

Tip: The client expects `VITE_API_URL` for the API base URL (see `client/src/api/api.js`).