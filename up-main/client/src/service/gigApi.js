import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gigApi = createApi({
  reducerPath: "gigApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getGigById: builder.query({
      query: (id) => `gigs/single/${id}`,
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});
export const { useGetGigByIdQuery, useGetUserByIdQuery } = gigApi;
