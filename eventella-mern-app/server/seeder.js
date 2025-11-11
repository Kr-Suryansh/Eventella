import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import events from './data/events.js';
import User from './models/User.js';
import Event from './models/Event.js';
import Booking from './models/Booking.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...'.yellow);
    await Event.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    // Create sample users
    console.log('Creating sample users...'.yellow);
    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@eventella.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'user@eventella.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@eventella.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Mike Johnson',
        email: 'mike@eventella.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@eventella.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    console.log(`✓ ${createdUsers.length} users created!`.green);

    // Insert events
    console.log('Creating events...'.yellow);
    const createdEvents = await Event.insertMany(events);
    console.log(`✓ ${createdEvents.length} events created!`.green);

    // Create sample bookings
    console.log('Creating sample bookings...'.yellow);
    const bookings = [];
    
    // Create 8 bookings with different users and events
    for (let i = 0; i < 8; i++) {
      bookings.push({
        user: createdUsers[(i % 4) + 1]._id, // Rotate through users (skip admin)
        event: createdEvents[i % createdEvents.length]._id, // Rotate through events
        seats: Math.floor(Math.random() * 5) + 1,
        totalPrice: createdEvents[i % createdEvents.length].price * (Math.floor(Math.random() * 5) + 1),
        status: Math.random() > 0.8 ? 'Cancelled' : 'Confirmed', // 20% chance of cancelled
      });
    }
    
    const createdBookings = await Booking.insertMany(bookings);
    console.log(`✓ ${createdBookings.length} bookings created!`.green);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Data Imported Successfully!'.green.inverse);
    console.log('='.repeat(60) + '\n');
    
    console.log('📝 Sample Users (for login):'.cyan);
    console.log('  Admin:  admin@eventella.com (password: password123)'.cyan);
    console.log('  User 1: user@eventella.com (password: password123)'.cyan);
    console.log('  User 2: jane@eventella.com (password: password123)'.cyan);
    console.log('  User 3: mike@eventella.com (password: password123)'.cyan);
    console.log('  User 4: sarah@eventella.com (password: password123)'.cyan);
    
    console.log('\n📊 Database Summary:'.cyan);
    console.log(`  Users:    ${createdUsers.length}`.cyan);
    console.log(`  Events:   ${createdEvents.length}`.cyan);
    console.log(`  Bookings: ${createdBookings.length}`.cyan);
    console.log('\n🌐 MongoDB URI: ' + (process.env.MONGO_URI || 'Not set').cyan);
    console.log('');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`.red.inverse);
    console.error(error.stack);
    await mongoose.connection.close();
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log('Destroying all data...'.yellow);
    await Event.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    console.log('✓ All data destroyed!'.red.inverse);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`.red.inverse);
    console.error(error.stack);
    await mongoose.connection.close();
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}