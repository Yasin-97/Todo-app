import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos, editTodo, addNewTodo, removeTodo } from "../_services/_api";
export const getTodosAsync = createAsyncThunk("fetchTodos", getTodos);
export const editTodoAsync = createAsyncThunk("editTodo", editTodo);
export const addNewTodoAsync = createAsyncThunk("addTodo", addNewTodo);
export const removeTodoAsync = createAsyncThunk("removeTodo", removeTodo);
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    // get
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
    // edit
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

    // add
    builder.addCase(addNewTodoAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewTodoAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    });
    builder.addCase(addNewTodoAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // remove
    builder.addCase(removeTodoAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    });
    builder.addCase(removeTodoAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default todoSlice.reducer;
