import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    stage: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: {
      type: [{
        type: String,
        trim: true,
      }],
      default: [],
      validate: {
        validator: function (tags) {
          return tags.length <= 4;
        },
        message: "Maximum 4 tags allowed",
      },
    }
  },
  {
    timestamps: true,
  }
);

const Task =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;