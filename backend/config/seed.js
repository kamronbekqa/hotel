import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Dacha from '../models/Dacha.js';
import connectDB from './db.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🌱 Starting database seed...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Dacha.deleteMany({});
    // console.log('✅ Cleared existing data');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@dacha.com' });
    
    if (!adminExists) {
      const adminUser = await User.create({
        name: 'Admin',
        email: 'admin@dacha.com',
        password: 'admin123', // Will be hashed automatically
        role: 'admin'
      });
      console.log('✅ Admin user created:');
      console.log('   Email: admin@dacha.com');
      console.log('   Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample user
    const userExists = await User.findOne({ email: 'user@test.com' });
    
    if (!userExists) {
      await User.create({
        name: 'Test User',
        email: 'user@test.com',
        password: 'password123',
        role: 'user'
      });
      console.log('✅ Test user created:');
      console.log('   Email: user@test.com');
      console.log('   Password: password123');
    } else {
      console.log('ℹ️  Test user already exists');
    }

    // Create sample dachas
    const dachaCount = await Dacha.countDocuments();
    
    if (dachaCount === 0) {
      const sampleDachas = [
        {
          title: 'Charvak Premium Resort',
          description: 'Gidrometeodan tepada joylashgan dabdabali dacha. Basseyndan Charvak suv omboriga ajoyib ko\'rinish. Barcha qulayliklar mavjud.',
          price: 500,
          type: 'rent',
          image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000',
          status: 'available',
          location: 'Charvak, Toshkent vil.',
          bedrooms: 5,
          bathrooms: 4,
          area: 450,
          features: ['Charvak manzarasi', 'Qishki basseyn', 'Sauna', 'Bilyard', 'Karaoke']
        },
        {
          title: 'Chimgan Forest Lodge',
          description: 'Archa va qarag\'aylar orasida joylashgan shinam dacha. Tabiat qo\'ynida dam olishni xohlovchilar uchun eng yaxshi tanlov.',
          price: 300,
          type: 'rent',
          image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000',
          status: 'available',
          location: 'Chimgan, Bo\'stonliq',
          bedrooms: 3,
          bathrooms: 2,
          area: 280,
          features: ['O\'rmon manzarasi', 'Kamin', 'Loyiha zonasi', 'Katta ayvon']
        },
        {
          title: 'Beldersay Sky View',
          description: 'Eng baland nuqtada joylashgan zamonaviy dacha. Kanat yo\'liga juda yaqin. High-tech uslubida qurilgan.',
          price: 700,
          type: 'rent',
          image: 'https://images.unsplash.com/photo-1514894780063-58813219ddc9?q=80&w=1000',
          status: 'available',
          location: 'Beldersoy, Toshkent vil.',
          bedrooms: 6,
          bathrooms: 5,
          area: 550,
          features: ['Panorama oyna', 'Isitiladigan basseyn', 'Smart Home', 'Tennis korti']
        },
        {
          title: 'Humsan Riverside Villa',
          description: 'Chirchiq daryosi bo\'yida joylashgan dacha. Suv ovozi va toza havo. Oilaviy dam olish uchun juda qulay.',
          price: 250,
          type: 'rent',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=1000',
          status: 'available',
          location: 'Humsan, Bo\'stonliq',
          bedrooms: 4,
          bathrooms: 3,
          area: 320,
          features: ['Daryo bo\'yi', 'Tapchan', 'Milliy oshxona', 'Bolalar maydonchasi']
        }
      ];

      await Dacha.insertMany(sampleDachas);
      console.log(`✅ Created ${sampleDachas.length} sample dachas`);
    } else {
      console.log(`ℹ️  Database already has ${dachaCount} dachas`);
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
