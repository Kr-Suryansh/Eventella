/**
 * File: client/src/pages/AdminDashboard.jsx
 * Purpose: Admin workspace to manage events and review all bookings.
 * - Events: Create/Update/Delete via EventForm
 * - Bookings: Read-only overview across users
 */
import { useState, useEffect } from 'react';
import { getAllBookings } from '../api/bookings';
import { getEvents, deleteEvent } from '../api/events';
import EventForm from '../components/EventForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [view, setView] = useState('events'); // 'events' or 'bookings'
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load either events or bookings depending on active view
  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === 'events') {
        const eventData = await getEvents();
        setEvents(eventData);
      } else {
        const bookingData = await getAllBookings();
        setBookings(bookingData);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  // Close modal and refresh list after saving
  const handleEventCreatedOrUpdated = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    fetchData(); // Refresh event list
  };

  // Open modal in edit mode
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  // Confirm and delete event, then refresh
  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted');
        fetchData(); // Refresh list
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-6 ${view === 'events' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setView('events')}
        >
          Manage Events
        </button>
        <button
          className={`py-2 px-6 ${view === 'bookings' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setView('bookings')}
        >
          View Bookings
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* Events View */}
          {view === 'events' && (
            <div>
              <button
                onClick={() => { setEditingEvent(null); setShowEventForm(true); }}
                className="bg-primary text-white px-4 py-2 rounded-md mb-6 hover:bg-amber-700"
              >
                + Add New Event
              </button>

              {showEventForm && (
                <EventForm 
                  event={editingEvent}
                  onSuccess={handleEventCreatedOrUpdated}
                  onCancel={() => setShowEventForm(false)}
                />
              )}

              <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map(event => (
                      <tr key={event._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event.availableSeats}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => handleEditEvent(event)} className="text-amber-600 hover:text-amber-900 mr-4"><FaEdit /></button>
                          <button onClick={() => handleDeleteEvent(event._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings View */}
          {view === 'bookings' && (
             <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map(booking => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{booking.event?.title || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{booking.user?.name || 'N/A'} ({booking.user?.email || 'N/A'})</td>
                        <td className="px-6 py-4 whitespace-nowrap">{booking.seats}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{booking.totalPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;