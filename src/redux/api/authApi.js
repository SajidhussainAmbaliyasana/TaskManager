import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    me: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} = authApi;