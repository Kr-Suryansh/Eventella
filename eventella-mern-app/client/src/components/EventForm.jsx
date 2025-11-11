import { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../api/events';
import { toast } from 'react-toastify';

const EventForm = ({ event, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Movie',
    location: '',
    date: '',
    price: '',
    availableSeats: '',
    imageURL: '',
    description: '',
    artist: '',
  });

  const isEditing = !!event;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: event.title,
        category: event.category,
        location: event.location,
        date: event.date.split('T')[0], // Format for date input
        price: event.price,
        availableSeats: event.availableSeats,
        imageURL: event.imageURL,
        description: event.description,
        artist: event.artist || '',
      });
    }
  }, [event, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateEvent(event._id, formData);
        toast.success('Event updated!');
      } else {
        await createEvent(formData);
        toast.success('Event created!');
      }
      onSuccess();
    } catch (error) {
      toast.error('Operation failed');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Event' : 'Create New Event'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="imageURL" placeholder="Image URL" value={formData.imageURL} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
          <div className="grid grid-cols-2 gap-4">
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Movie">Movie</option>
              <option value="Concert">Concert</option>
              <option value="Play">Play</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
            </select>
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
             <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
             <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
             <input type="number" name="availableSeats" placeholder="Available Seats" value={formData.availableSeats} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
           <input type="text" name="artist" placeholder="Artist (Optional)" value={formData.artist} onChange={handleChange} className="w-full p-2 border rounded" />
          
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">{isEditing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;