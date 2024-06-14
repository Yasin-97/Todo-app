/* eslint-disable react/prop-types */
import Checkbox from "./Checkbox";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { formatEstimation } from "../_utils";
import AddTodoModal from "./AddTodoModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodoAsync } from "../_redux/todoSlice";

export default function SingleTodo({ data, onToggleComplete, onRemove }) {
  const dispatch = useDispatch();

  const [todoForm, setTodoForm] = useState(data);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    dispatch(editTodoAsync(todoForm));
  };

  const handleFormFieldChange = (fieldName, e) => {
    setTodoForm((prevForm) => ({
      ...prevForm,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <div className="single-todo-container">
      <div className="single-todo">
        <Checkbox checked={data.completed} onClick={onToggleComplete} />

        <p className="single-todo-text">
          {data.todo} <span>({formatEstimation(data.estimation)} h)</span>
        </p>
        <div className="single-todo-icon-container">
          <AiFillEdit
            onClick={() => setIsEditModalOpen(true)}
            className="single-todo-icon"
          />
          <FaTrash
            onClick={onRemove}
            className="single-todo-icon single-todo-trash-icon"
          />
        </div>
      </div>
      <AddTodoModal
        data={todoForm}
        isModalOpen={isEditModalOpen}
        handleSubmit={handleEdit}
        handleChange={handleFormFieldChange}
        handleClose={() => {
          setTodoForm({});
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
