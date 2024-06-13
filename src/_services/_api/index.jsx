import { toast } from "react-toastify";
import { axiosInstance } from "../../_utils/axiosInstance";

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`todos`);
    return res.data;
  } catch (error) {
    toast.error(`Error: failed to get your todo list`);
  }
};

export const addNewTodo = async (data) => {
  try {
    const res = await axiosInstance.post("todos", data);
    return res.data;
  } catch (error) {
    toast.error(`Error: failed to add new todo item`);
  }
};

export const editTodo = async (data) => {
  try {
    const res = await axiosInstance.patch(`todos/${data.id}`, data);
    return res.data;
  } catch (error) {
    toast.error(`Error: failed to edit your todo item`);
  }
};

export const removeTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`todos/${id}`);
    return res.data;
  } catch (error) {
    toast.error(`Error: failed to remove your todo item`);
  }
};
