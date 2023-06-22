import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../service/userAuthApi";
import { userApi } from "../service/userApi";
import { reviewsApi } from "../service/reviewsApi";

const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAuthApi.middleware)
      .concat(userApi.middleware)
      .concat(reviewsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
