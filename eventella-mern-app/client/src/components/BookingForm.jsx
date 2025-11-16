// Minimal placeholder booking form (unused in primary flow)
import React from 'react';

export default function BookingForm() {
  return (
    <form className="space-y-2">
      <input placeholder="Name" />
      <input placeholder="Seats" type="number" />
      <button type="submit">Book</button>
    </form>
  );
}
