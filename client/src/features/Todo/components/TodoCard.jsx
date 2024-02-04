import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../services/todo.services";

const TodoCard = ({ todoItem, setSelectedItemForEdition }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className="w-full my-4 p-8 border rounded-xl drop-shadow-xl">
      <div className="flex items-center justify-between">
        <p>{todoItem?.title}</p>

        <div className="flex items-center space-x-4">
          {todoItem?.status === "Pending" && (
            <EditIcon
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemForEdition(todoItem);
              }}
            />
          )}

          <DeleteIcon
            className="cursor-pointer"
            onClick={async () => {
              await deleteTodo({ id: todoItem?.id });
            }}
          />

          {todoItem?.status === "Pending" && (
            <DoneIcon
              className="cursor-pointer"
              onClick={async () => {
                await updateTodo({
                  id: todoItem?.id,
                  data: { status: "Completed" },
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
