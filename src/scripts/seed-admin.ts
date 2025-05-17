import { hash } from 'bcryptjs';
import connectDB from '../lib/mongodb';
import User from '../models/User';

async function seedAdmin() {
  try {
    await connectDB();
    console.log("Connected to database");
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }
    
    // Create admin user
    const hashedPassword = await hash('adminpassword123', 10);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    process.exit();
  }
}

seedAdmin();