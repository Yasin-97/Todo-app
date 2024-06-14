import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from "../_redux/todoSlice";
import SingleTodo from "./SingleTodo";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <div className="todos-container">
      {todos?.data?.map((todo) => (
        <SingleTodo key={todo.id} data={todo} />
      ))}
    </div>
  );
};

export default Todos;
