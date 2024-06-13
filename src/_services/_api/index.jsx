import { axiosInstance } from "../../_utils/axiosInstance";

export const getTodos = async () => {
  const res = await axiosInstance.get(`todos`);
  return res.data;
};

export const addNewTodo = async (data) => {
  const res = await axiosInstance.post("todos", data);
  return res.data;
};

export const editTodo = async (data) => {
  const res = await axiosInstance.put(`todos/${data.id}`, data);
  return res.data;
};

export const removeTodo = async (todoId) => {
  const res = await axiosInstance.delete(`todos/${todoId}`);
  return res.data;
};
