/**
 * File: client/src/pages/Home.jsx
 * Purpose: Landing page showing hero section, filters, and the event grid.
 *
 * State:
 * - events: fetched from API based on filters and search query
 * - filterParams: passed to getEvents as query params
 * - searchQuery/debouncedQuery: free-text search with debounce
 */
import { useState, useEffect } from 'react';
import { getEvents } from '../api/events';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Filters from '../components/Filters';
import { toast } from 'react-toastify';
import { FaSearch, FaStar, FaArrowRight } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 450);

  // Fetch events whenever filters or debounced search change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = { ...filterParams };
        if (debouncedQuery && debouncedQuery.trim()) {
          params.q = debouncedQuery.trim();
        }
        const data = await getEvents(params);
        setEvents(data);
      } catch (error) {
        toast.error('Could not fetch events');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [filterParams, debouncedQuery]);

  return (
    <div className="min-h-screen">
      {/* Animated Blobs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 md:py-32 px-4 md:px-0">
        <div className="container mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/40 backdrop-blur-xl rounded-full border border-amber-100/50">
              <FaStar className="brand-icon text-sm animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Discover Amazing Events</span>
            </div>

            <h1 className="text-gray-800 mb-6 leading-tight text-6xl md:text-8xl">
              <span className="brand-gradient-text brand-cursive-heading">
                Book Your Next
                <br />
                Unforgettable Experience
              </span>
            </h1>

            <p className="font-arizonia-sm text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              From thrilling concerts to exclusive workshops. Find, book, and share your favorite moments with friends
            </p>

            {/* Search Bar with Artistic Design */}
            <div className="max-w-3xl mx-auto mb-16">
              <div className="relative group">
                {/* Gradient Blur Background */}
                <div className="absolute -inset-1 bg-gold-blob rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {/* Search Container */}
                <div className="relative bg-white rounded-full flex items-center px-6 md:px-8 py-4 md:py-5 shadow-2xl border border-white/80 backdrop-blur-xl">
                  <FaSearch className="brand-icon text-xl mr-4 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search events, artists, shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Force immediate search on Enter by updating filterParams
                        setFilterParams((prev) => ({ ...prev, q: searchQuery.trim() || undefined }));
                      }
                    }}
                    className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-lg bg-transparent"
                  />
                  <button
                    className="btn-primary ml-4 whitespace-nowrap flex items-center gap-2 py-2 px-3"
                    onClick={() => setFilterParams((prev) => ({ ...prev, q: searchQuery.trim() || undefined }))}
                  >
                    <span className="brand-cursive text-current text-lg md:text-2xl leading-tight flex items-center gap-2">
                      Search
                      <FaArrowRight className="brand-icon text-base md:text-lg" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              {[
                { num: '5K+', label: 'Events' },
                { num: '100K+', label: 'Users' },
                { num: '50+', label: 'Cities' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="group relative"
                  style={{ animation: `fadeInUp 0.8s ease-out ${idx * 0.1}s both` }}
                >
                  <div className="absolute -inset-2 bg-gold-blob rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-white px-4 md:px-6 py-4 rounded-lg backdrop-blur-xl">
                    <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text" style={{background: 'linear-gradient(90deg, #c79b3a 0%, #f0c25a 50%, #ffd77a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                      {stat.num}
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 animate-slideDown">
              <Filters setFilterParams={setFilterParams} />
            </div>
          </div>

          {/* Event Grid */}
          <div className="flex-1">
            {/* Section Header with Artistic Design */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-8 accent-gold-bar rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-display font-black">
                  <span className="text-gradient brand-cursive text-4xl md:text-5xl lg:text-6xl tracking-wide">Trending Now</span>
                </h2>
              </div>
              <p className="text-gray-600 ml-6">Handpicked events just for you</p>
            </div>

            {/* Events Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {events.map((event, index) => (
                      <div
                        key={event._id}
                        style={{
                          animation: `slideUp 0.6s ease-out`,
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'both',
                        }}
                      >
                        <EventCard event={event} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-7xl mb-4">🎭</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">No Events Found</h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                      We couldn't find any events matching your criteria. Try adjusting your filters!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;