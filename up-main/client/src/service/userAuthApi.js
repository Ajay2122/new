// userAuthApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setUser } from "../Stores/userSlice";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log(data)
        dispatch(setUser(data));
      },
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/resetPassword/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
} = userAuthApi;
