// Generic 404 page for unmatched routes
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center max-w-lg mx-auto mt-20 p-10 bg-white rounded-lg shadow-xl">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;