import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTodoAsync,
  getTodosAsync,
  removeTodoAsync,
} from "../_redux/todoSlice";
import SingleTodo from "./SingleTodo";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  const handleRemove = (id) => {
    dispatch(removeTodoAsync(id));
  };

  const toggleComplete = (newTodoData) => {
    dispatch(editTodoAsync(newTodoData));
  };

  return (
    <div className="todos-container">
      {!todos?.data?.length && (
        <p className="empty-todo-text">You got nothing to do for now !</p>
      )}
      {todos?.data?.map((todo) => (
        <SingleTodo
          key={todo.id}
          data={todo}
          onRemove={() => handleRemove(todo.id)}
          onToggleComplete={() =>
            toggleComplete({ id: todo.id, completed: !todo.completed })
          }
        />
      ))}
    </div>
  );
};

export default Todos;
