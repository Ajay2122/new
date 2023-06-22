// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const reviewsApi = createApi({
//   reducerPath: "reviewsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8000/api/",
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getReviews: builder.query({
//       query: (gigId) => `reviews/${gigId}`,
//     }),
//     addReview: builder.mutation({
//       query: (review) => ({
//         url: "reviews",
//         method: "POST",
//         body: review,
//       }),
//     }),
//   }),
// });

// export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (gigId) => `reviews/${gigId}`,
    }),
    addReview: builder.mutation({
      query: (review) => ({
        url: 'reviews',
        method: 'POST',
        body: review,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;
