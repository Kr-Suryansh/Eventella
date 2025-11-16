/**
 * File: server/data/events.js
 * Purpose: Sample event dataset used by seeder for development environments.
 */
const events = [
  {
    title: 'In the Lost Lands',
    category: 'Movie',
    location: 'Cineplex, Downtown',
    date: new Date('2025-12-01T19:00:00'),
    price: 150,
    availableSeats: 100,
    imageURL: 'https://image.tmdb.org/t/p/w500/m6XgVLXSOeE0i2oBKOl1e9s52s.jpg',
    description: 'A sorceress travels to the Lost Lands in search of a magical power.',
    artist: 'N/A'
  },
  {
    title: 'Until Dawn: The Movie',
    category: 'Movie',
    location: 'Metro Cinema, Uptown',
    date: new Date('2025-12-05T20:30:00'),
    price: 160,
    availableSeats: 80,
    imageURL: 'https://image.tmdb.org/t/p/w500/vszDPPdtS2wXg5Eax9dG9Qe2CZe.jpg',
    description: 'Eight friends become trapped on a remote mountain retreat when a killer strikes.',
    artist: 'N/A'
  },
  {
    title: 'Lilo & Stitch (Live Action)',
    category: 'Movie',
    location: 'Family Multiplex, Suburb',
    date: new Date('2025-12-10T15:00:00'),
    price: 140,
    availableSeats: 120,
    imageURL: 'https://image.tmdb.org/t/p/w500/o7SjMmcBa6M9iTjLG0mR3RSToD.jpg',
    description: 'A young girl adopts a "dog" from the local pound, unaware that it is a dangerous alien experiment.',
    artist: 'N/A'
  },
  {
    title: 'Arijit Singh Live',
    category: 'Concert',
    location: 'Grand Stadium, City Center',
    date: new Date('2025-12-15T18:00:00'),
    price: 2500,
    availableSeats: 5000,
    imageURL: 'https://i.scdn.co/image/ab6761610000e5eb0261696c5df3be99da6394be',
    description: 'Experience the soulful voice of Arijit Singh live in concert.',
    artist: 'Arijit Singh'
  },
  {
    title: 'Intro to Pottery',
    category: 'Workshop',
    location: 'Clay Studio, Arts District',
    date: new Date('2025-12-07T11:00:00'),
    price: 800,
    availableSeats: 20,
    imageURL: 'https://images.unsplash.com/photo-1578780703885-91880f089194',
    description: 'A hands-on workshop for beginners to learn the basics of pottery and wheel throwing.',
    artist: 'Studio Clay'
  },
];

export default events;