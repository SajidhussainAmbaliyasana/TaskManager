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
    });

    const stats = {
      total: tasks.length,

      todo: tasks.filter(
        (task) => task.stage === "Todo"
      ).length,

      inProgress: tasks.filter(
        (task) => task.stage === "In Progress"
      ).length,

      done: tasks.filter(
        (task) => task.stage === "Done"
      ).length,

      high: tasks.filter(
        (task) => task.priority === "High"
      ).length,

      medium: tasks.filter(
        (task) => task.priority === "Medium"
      ).length,

      low: tasks.filter(
        (task) => task.priority === "Low"
      ).length,
    };

    return Response.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Task Stats Error:", error);

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