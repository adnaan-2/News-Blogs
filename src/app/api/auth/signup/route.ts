import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, password } = await request.json();
    
    // Basic validation
    if (!name || !email || !password || password.length < 8) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }
    
    // Check if email exists
    const emailLower = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailLower });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user
    const newUser = await User.create({
      name,
      email: emailLower,
      password: hashedPassword,
      role: 'user' // Default role
    });
    
    // Return success but don't include password
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}