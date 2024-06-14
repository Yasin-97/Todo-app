import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodoAsync,
  editTodoAsync,
  getTodosAsync,
  removeTodoAsync,
} from "../_redux/todoSlice";
import SingleTodo from "./SingleTodo";
import TodoModal from "./TodoModal";
import Button from "./Button";
import FormField from "./FormField";

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
    estimation: "",
    completed: false,
  });

  const [filterState, setFilterState] = useState(0);
  const [query, setQuery] = useState("");

  const handleSubmitNewTodo = async (e) => {
    e.preventDefault();
    if (todoForm.todo.length < 3 || todoForm.estimation.length < 1) return;
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

  const filteredTodos = useMemo(() => {
    let categorizedTodos = [];
    switch (todoFilters[filterState]) {
      case "Complete":
        categorizedTodos = todos.data.filter((todo) => todo.completed);
        break;
      case "Incomplete":
        categorizedTodos = todos.data.filter((todo) => !todo.completed);
        break;
      case "All":
        categorizedTodos = todos.data;
    }

    const filterdTodos = categorizedTodos.filter((item) => {
      return item.todo.toLowerCase().includes(query.toLowerCase());
    });

    return filterdTodos;
  }, [filterState, todos.data, query]);

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

        <FormField
          placeholder="Search Todo"
          inputType="text"
          value={query}
          handleChange={(e) => setQuery(e.target.value)}
        />

        <Button
          handleClick={() => setIsAddTodoModalOpen(true)}
          btnType="button"
          title={"Add Todo"}
          className="add-todo-btn"
        />
      </div>
      <div className="todos-container">
        {!filteredTodos?.length && (
          <p className="empty-todo-text">There Is No Task !</p>
        )}
        {filteredTodos?.map((todo) => (
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
      <TodoModal
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
