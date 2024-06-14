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

  return (
    <>
      <button onClick={() => setIsAddTodoModalOpen(true)}>
        edit the todo item
      </button>
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
    </>
  );
};

export default Todos;
