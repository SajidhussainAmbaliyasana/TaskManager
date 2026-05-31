import { baseApi } from "./baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),

    getTaskStats: builder.query({
      query: () => "/tasks/stats",
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTaskStage: builder.mutation({
      query: ({ id, stage }) => ({
        url: `/tasks/${id}/stage`,
        method: "PATCH",
        body: { stage },
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskStatsQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStageMutation,
  useDeleteTaskMutation,
} = taskApi;