/* eslint-disable react/prop-types */
import Checkbox from "./Checkbox";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function SingleTodo({
  data,
  onToggleComplete,
  onRemove,
  onEdit,
}) {
  return (
    <div className="single-todo-container">
      <div className="single-todo">
        <Checkbox checked={data.completed} onClick={onToggleComplete} />

        <p className="single-todo-text">
          {data.todo} <span>({(data.estimation / 60).toFixed(1)} h)</span>
        </p>
        <div className="single-todo-icon-container">
          <AiFillEdit onClick={onEdit} className="single-todo-icon" />
          <FaTrash
            onClick={onRemove}
            className="single-todo-icon single-todo-trash-icon"
          />
        </div>
      </div>
    </div>
  );
}
