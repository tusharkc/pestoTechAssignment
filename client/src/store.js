import { configureStore } from "@reduxjs/toolkit";
import appUserSlice from "./slices/appUser.slice";
import { appUserApi } from "./services/appUser.services";
import todoSlice from "./features/Todo/services/todo.slice";
import { todoApi } from "./features/Todo/services/todo.services";

export const store = configureStore({
  reducer: {
    appUserSlice: appUserSlice,
    todoSlice: todoSlice,
    [appUserApi.reducerPath]: appUserApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appUserApi.middleware, todoApi.middleware),
});
