/**
 * File: client/src/components/EventCard.jsx
 * Purpose: Display a single event with image, details, and CTA; links to details page.
 *
 * Props:
 * - event: { _id, title, imageURL, location, date, price, category }
 *
 * State:
 * - isWishlisted: local UI-only toggle for wishlist heart
 */
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendar, FaRupeeSign, FaHeart, FaStar } from 'react-icons/fa';
import { useState } from 'react';

const EventCard = ({ event }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link to={`/event/${event._id}`} className="group block h-full">
  <div className="card card-hover relative overflow-hidden h-full flex flex-col backdrop-blur-xl border border-white/30 hover:border-amber-100/50">
        {/* Image Container */}
        <div className="relative overflow-hidden h-56 md:h-64 bg-gray-100">
          <img
            src={event.imageURL}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
          />
          
          {/* Artistic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Wishlist Button with Animation */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-10"
          >
            <FaHeart
              size={18}
              className={`transition-all duration-300 ${
                isWishlisted ? 'text-amber-600 scale-125' : 'text-gray-300'
              }`}
            />
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-gold-strong text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
            {event.category}
          </div>

          {/* Rating Badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xl rounded-lg px-3 py-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <FaStar className="brand-icon" size={14} />
            <span className="text-sm font-bold text-gray-800">4.8</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-display font-black mb-2 line-clamp-2 group-hover:text-gradient transition-colors duration-300">
            {event.title}
          </h3>

          {/* Details */}
          <div className="space-y-2.5 text-sm text-gray-600 mb-5 flex-1">
            <div className="flex items-center gap-2 group/detail">
              <FaMapMarkerAlt className="brand-icon flex-shrink-0 group-hover/detail:scale-110 transition-transform" size={14} />
              <span className="truncate group-hover/detail:text-gray-800 transition-colors">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 group/detail">
              <FaCalendar className="brand-icon flex-shrink-0 group-hover/detail:scale-110 transition-transform" size={14} />
              <span className="group-hover/detail:text-gray-800 transition-colors">{new Date(event.date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-5 border-t border-gray-100 group-hover:border-amber-100 transition-colors duration-300">
            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-xs text-gray-500 font-medium">From</span>
              <span className="text-lg font-black text-transparent bg-clip-text flex items-center gap-0.5 leading-none" style={{background: 'linear-gradient(90deg, #c79b3a 0%, #f0c25a 50%, #ffd77a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                <FaRupeeSign size={14} className="brand-icon" />
                {event.price}
              </span>
            </div>
            <button className="btn-primary h-10 text-sm py-0 px-4 whitespace-nowrap shadow-lg hover:shadow-2xl transform transition-all duration-300 group-hover:scale-110 flex items-center justify-center gap-2 self-center ml-6">
              <span className="brand-cursive text-current text-lg md:text-2xl leading-tight flex items-center gap-2 justify-center">
                Book
                <span className="text-sm md:text-base">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;