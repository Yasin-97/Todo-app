import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos, editTodo } from "../_services/_api";
export const getTodosAsync = createAsyncThunk("fetchTodos", getTodos);
export const editTodoAsync = createAsyncThunk("editTodo", editTodo);
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTodosAsync.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(editTodoAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex((todo) => {
        return todo.id === action.payload.id;
      });
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    });
    builder.addCase(editTodoAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default todoSlice.reducer;
