import { configureStore } from "@reduxjs/toolkit";
import appUserSlice from "./slices/appUser.slice";
import { appUserApi } from "./services/appUser.services";

export const store = configureStore({
  reducer: {
    appUserSlice: appUserSlice,
    [appUserApi.reducerPath]: appUserApi,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appUserApi.middleware),
});
