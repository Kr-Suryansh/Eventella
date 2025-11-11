import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../api/bookings';
import { toast } from 'react-toastify';
import { FaCalendar, FaMapMarkerAlt, FaChair, FaRupeeSign } from 'react-icons/fa';

const BookingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event, seats } = state || {};

  if (!event || !seats) {
    navigate('/');
    return null;
  }

  const totalPrice = (event.price * seats).toFixed(2);

  const handleConfirmBooking = async () => {
    try {
      await createBooking({ eventId: event._id, seats });
      toast.success('Booking Confirmed!');
      navigate('/dashboard', { state: { message: 'Booking successful!' } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Confirm Your Booking</h1>
      
      <div className="mb-6 border-b pb-6">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 brand-cursive-heading brand-gradient-text">{event.title}</h2>
        <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
            <FaCalendar className="mr-2 text-primary" />
            <span>{new Date(event.date).toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
        <div className="flex justify-between items-center mb-2 text-lg">
            <span>Tickets ({event.category})</span>
            <span className="flex items-center"><FaChair className="mr-2" /> x {seats}</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-lg">
            <span>Price per ticket</span>
            <span className="flex items-center"><FaRupeeSign size={14} />{event.price}</span>
        </div>
      </div>

      <div className="border-t pt-4">
         <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total Amount</span>
            <span className="text-primary flex items-center"><FaRupeeSign size={20} />{totalPrice}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">This is a simulated payment. No payment will be processed.</p>
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-bold hover:bg-red-700 transition duration-300"
        >
          Confirm & Book
        </button>
      </div>
    </div>
  );
};

export default BookingPage;