import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../services/todo.services";
import { Select, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";

const Todos = () => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [slectedForEdition, setSlectedForEdition] = useState();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const { isLoading } = useGetTodosQuery(
    {
      filter: {
        selectedFilter: selectedFilter,
      },
    },
    { refetchOnMountOrArgChange: true }
  );

  const todosData = useSelector((state) => state.todoSlice.todos);

  useEffect(() => {
    setInputValue(slectedForEdition?.title);
  }, [slectedForEdition]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleButtonClick = async () => {
    if (slectedForEdition) {
      await updateTodo({
        id: slectedForEdition.id,
        data: {
          title: inputValue,
        },
      });
    } else await addTodo({ title: inputValue });

    setInputValue("");
    setSlectedForEdition();
  };

  return (
    <div className="mt-12 container mx-auto w-[30vw]">
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-between w-full py-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-2 rounded-lg mr-4"
          />

          <Select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="border-2 border-gray-300 p-2 rounded-lg mr-4"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            {!slectedForEdition ? "Add" : "Update"} Todo
          </button>
        </div>

        <div className="w-full">
          {!isLoading && todosData?.length > 0 ? (
            todosData?.map((todoItem) => (
              <TodoCard
                setSelectedItemForEdition={setSlectedForEdition}
                todoItem={todoItem}
              />
            ))
          ) : (
            <>
              <p className="w-full my-4 p-8 border rounded-xl drop-shadow-xl">
                No Data found
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
