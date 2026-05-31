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
    const { stage } = await request.json();

    if (!stage) {
      return Response.json(
        {
          success: false,
          message: "Stage is required",
        },
        {
          status: 400,
        }
      );
    }

    const allowedStages = [
      "Todo",
      "In Progress",
      "Done",
    ];

    if (!allowedStages.includes(stage)) {
      return Response.json(
        {
          success: false,
          message: "Invalid stage",
        },
        {
          status: 400,
        }
      );
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      {
        stage,
      },
      {
        new: true,
      }
    );

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
      message: "Task stage updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update Stage Error:", error);

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