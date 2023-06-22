import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;

