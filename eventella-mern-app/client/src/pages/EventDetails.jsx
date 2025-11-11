import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById } from '../api/events';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCalendar, FaMapMarkerAlt, FaRupeeSign, FaChair } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error(error);
        navigate('/notfound');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleBooking = () => {
    if (!user) {
      navigate('/login', { state: { from: `/event/${id}` } });
      return;
    }
    // Pass event data and seats to booking page
    navigate(`/book/${id}`, { state: { event, seats } });
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return null;

  const totalPrice = (event.price * seats).toFixed(2);

  return (
    <div className="bg-gold-blob p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="md:flex">
        <img
          src={event.imageURL}
          alt={event.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="md:ml-8 mt-6 md:mt-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 brand-cursive-heading brand-gradient-text">{event.title}</h1>
          <span className="bg-gold-pill text-amber-900 text-sm font-semibold px-3 py-1 rounded-full inline-block">
            {event.category}
          </span>
          <p className="text-lg text-gray-700 mt-4">{event.description}</p>

          <div className="my-6 space-y-3">
            <div className="flex items-center text-lg">
              <FaCalendar className="mr-3 brand-icon" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-lg">
              <FaMapMarkerAlt className="mr-3 brand-icon" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-lg">
              <FaChair className="mr-3 brand-icon" />
              <span>{event.availableSeats} Seats Available</span>
            </div>
            <div className="flex items-center text-2xl font-bold">
              <FaRupeeSign className="mr-2 brand-icon" size={20} />
              <span className="brand-gradient-text">{event.price} <span className="text-sm font-normal">(per ticket)</span></span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white/95 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="seats" className="font-semibold text-lg">
                Select Seats:
              </label>
              <input
                type="number"
                id="seats"
                min="1"
                max={event.availableSeats}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-20 p-2 border rounded-md text-center"
              />
            </div>
            <div className="text-xl font-bold mb-4">
              Total Price: <span className="brand-gradient-text">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleBooking}
              className="w-full brand-gold-bg py-3 rounded-lg text-lg font-bold transition duration-300 hover:scale-105 flex items-center justify-center"
            >
              <span className="brand-cursive text-current text-base">Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;