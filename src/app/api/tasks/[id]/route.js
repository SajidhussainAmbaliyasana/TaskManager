import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Task from "@/models/Task";

export async function PATCH(request, { params }) {
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

    const { id } = await params;

    const task = await Task.findOne({
      _id: id,
      userId: user._id,
    });

    if (!task) {
      return Response.json(
        {
          success: false,
          message: "Task not found",
        },
        {
          status: 404,
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

    // Validate tags
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

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (stage !== undefined) task.stage = stage;
    if (priority !== undefined) task.priority = priority;
    if (tags !== undefined) task.tags = tags;

    await task.save();

    return Response.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update Task Error:", error);

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
export async function DELETE(request, { params }) {
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

    const { id } = await params;

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!task) {
      return Response.json(
        {
          success: false,
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

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