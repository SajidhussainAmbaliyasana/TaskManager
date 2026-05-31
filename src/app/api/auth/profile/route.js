import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/User";

export async function PATCH(request) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const {
      name,
      email,
      password,
    } = await request.json();

    // Check email uniqueness
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: currentUser._id },
      });

      if (existingUser) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 409,
          }
        );
      }
    }

    const user = await User.findById(currentUser._id);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email.toLowerCase();
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return Response.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile Update Error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}