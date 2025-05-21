import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Remove the unused req parameter
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    // Get counts from database
    const totalUsers = await User.countDocuments();
    
    // These would use your actual Post and Category models
    // const totalPosts = await Post.countDocuments();
    // const totalCategories = await Category.countDocuments();
    
    // For now, use placeholder values
    const totalPosts = 15;
    const totalCategories = 8;

    return NextResponse.json({
      totalUsers,
      totalPosts,
      totalCategories
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}