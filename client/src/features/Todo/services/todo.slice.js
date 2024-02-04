import { createSlice } from "@reduxjs/toolkit";
import { todoApi } from "./todo.services";

const initialState = {
  todos: [],
  selectedFilter: "All",
};

export const todoSlice = createSlice({
  name: "todo",

  initialState,
  reducers: {
    setSlectedTodoFilter: (stata, action) => {
      stata.selectedFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.getTodos.matchFulfilled,
      (state, { payload }) => {
        state.todos = payload.data;
      }
    );
  },
});

export const { setSlectedTodoFilter } = todoSlice.reducer;

export default todoSlice.reducer;
