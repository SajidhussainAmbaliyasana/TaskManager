import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
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

    const tasks = await Task.find({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

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

export async function POST(request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
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
      title,
      description,
      stage,
      priority,
      tags,
    } = await request.json();

    // Validation
    if (!title || !description) {
      return Response.json(
        {
          success: false,
          message: "Title and description are required",
        },
        {
          status: 400,
        }
      );
    }

    if (tags && tags.length > 4) {
      return Response.json(
        {
          success: false,
          message: "Maximum 4 tags allowed",
        },
        {
          status: 400,
        }
      );
    }

    const task = await Task.create({
      title,
      description,
      stage: stage || "Todo",
      priority: priority || "Medium",
      tags: tags || [],
      userId: user._id,
    });

    return Response.json(
      {
        success: true,
        message: "Task created successfully",
        task,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Task Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
