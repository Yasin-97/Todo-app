import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodoAsync,
  editTodoAsync,
  getTodosAsync,
  removeTodoAsync,
} from "../_redux/todoSlice";
import SingleTodo from "./SingleTodo";
import AddTodoModal from "./AddTodoModal";
import Button from "./Button";

const todoFilters = ["All", "Complete", "Incomplete"];
const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [todoForm, setTodoForm] = useState({
    todo: "",
    estimation: 0,
    completed: false,
  });

  const [filterState, setFilterState] = useState(0);

  const handleSubmitNewTodo = async (e) => {
    e.preventDefault();
    dispatch(addNewTodoAsync(todoForm)).then(() => {
      setTodoForm({});
      setIsAddTodoModalOpen(false);
    });
  };

  const handleFormFieldChange = (fieldName, e) => {
    setTodoForm((prevForm) => ({
      ...prevForm,
      [fieldName]: e.target.value,
    }));
  };

  const handleRemove = (id) => {
    dispatch(removeTodoAsync(id));
  };

  const toggleComplete = (newTodoData) => {
    dispatch(editTodoAsync(newTodoData));
  };

  const filteredTodos = () => {
    switch (todoFilters[filterState]) {
      case "Complete":
        return todos.data.filter((todo) => todo.completed);

      case "Incomplete":
        return todos.data.filter((todo) => !todo.completed);

      default:
        return todos.data;
    }
  };

  const changefilterState = () => {
    setFilterState((prev) => (prev >= 2 ? 0 : prev + 1));
  };

  return (
    <div className="app">
      <h1 className="taskChain">TaskChain </h1>
      <div className="todo-btn-chain">
        <Button
          handleClick={changefilterState}
          title={todoFilters[filterState]}
          className={"filter-toggle-btn"}
        />

        <Button
          handleClick={() => setIsAddTodoModalOpen(true)}
          btnType="button"
          title={"Add Todo"}
          className="add-todo-btn"
        />
      </div>
      <div className="todos-container">
        {!filteredTodos()?.length && (
          <p className="empty-todo-text">You got nothing to do for now !</p>
        )}
        {filteredTodos()?.map((todo) => (
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
      <AddTodoModal
        data={todoForm}
        isModalOpen={isAddTodoModalOpen}
        handleSubmit={handleSubmitNewTodo}
        handleChange={handleFormFieldChange}
        handleClose={() => {
          setTodoForm({});
          setIsAddTodoModalOpen(false);
        }}
      />
    </div>
  );
};

export default Todos;
