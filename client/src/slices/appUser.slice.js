import { createSlice } from "@reduxjs/toolkit";
import { appUserApi } from "../services/appUser.services";

const initialState = {
  appToken: "",
  user: {},
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        appUserApi.endpoints.signUp.matchFulfilled,
        (state, action) => {
          state.appToken = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addMatcher(
        appUserApi.endpoints.logIn.matchFulfilled,
        (state, action) => {
          state.appToken = action.payload.token;
          state.user = action.payload.user;
        }
      );
  },
});

// export const {} = appUserSlice.actions;

export default appUserSlice.reducer;
