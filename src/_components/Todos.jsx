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
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {todos?.data?.map((todo) => (
          <SingleTodo key={todo.id} data={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
