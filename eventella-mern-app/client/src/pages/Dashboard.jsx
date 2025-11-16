/**
 * File: client/src/pages/Dashboard.jsx
 * Purpose: Show current user's bookings with ability to cancel confirmed ones.
 * Notes: Filters out bookings whose related event has been deleted.
 */
import { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../api/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaCalendar, FaMapMarkerAlt, FaChair, FaRupeeSign } from 'react-icons/fa';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load bookings for the current user
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Could not fetch bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Confirm and cancel a booking; refresh list after
  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(id);
        toast.success('Booking cancelled');
        fetchBookings(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Cancellation failed');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {bookings.filter(booking => booking.event).length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.filter(booking => booking.event).map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row">
              <img 
                src={booking.event.imageURL || '/api/placeholder/400/300'} 
                alt={booking.event.title} 
                className="w-full md:w-1/3 h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-6" 
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{booking.event.title}</h2>
                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {booking.status}
                </span>
                <div className="my-3 space-y-2 text-gray-700">
                  <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-primary" /> {booking.event.location}</p>
                  <p className="flex items-center"><FaCalendar className="mr-2 text-primary" /> {new Date(booking.event.date).toLocaleString()}</p>
                  <p className="flex items-center"><FaChair className="mr-2 text-primary" /> {booking.seats} Seats</p>
                  <p className="flex items-center font-semibold"><FaRupeeSign className="mr-1" /> {booking.totalPrice}</p>
                </div>
                {booking.status === 'Confirmed' && (
                  <button 
                    onClick={() => handleCancel(booking._id)}
                    className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;