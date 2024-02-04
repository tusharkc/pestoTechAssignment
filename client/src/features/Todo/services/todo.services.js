import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/todo",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().appUserSlice.appToken;

      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  reducerPath: "todoApi",
  tagTypes: ["todo"],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ filter }) => ({
        url: "/getTodos",
        params: filter,
      }),

      providesTags: ["todo"],
    }),

    addTodo: builder.mutation({
      query: (data) => ({
        url: "/addTodo",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["todo"],
    }),

    updateTodo: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/updateTodo/${id}`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: ["todo"],
    }),

    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
