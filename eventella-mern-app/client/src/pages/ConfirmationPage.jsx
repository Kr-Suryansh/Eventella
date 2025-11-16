/**
 * File: client/src/pages/ConfirmationPage.jsx
 * Purpose: Post-booking confirmation screen (lightweight placeholder).
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const ConfirmationPage = () => {
  const { state } = useLocation();
  
  return (
    <div className="max-w-lg mx-auto text-center bg-white p-10 rounded-lg shadow-xl">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Your booking has been successfully processed. You can view your
        tickets in your dashboard.
      </p>
      {/* In a real app, you might get booking details from location state 
        e.g., <p>Booking ID: {state?.booking?._id}</p> 
      */}
      <Link
        to="/dashboard"
        className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700"
      >
        View My Bookings
      </Link>
    </div>
  );
};

export default ConfirmationPage;