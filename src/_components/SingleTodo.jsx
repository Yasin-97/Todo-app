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
      <div className="single-todo" style={{ gap: "24px" }}>
        <Checkbox checked={data.completed} onClick={onToggleComplete} />

        <p
          style={{
            textAlign: "left",
            alignSelf: "end",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          {data.todo}{" "}
          <span style={{ opacity: ".8" }}>
            ({(data.estimation / 60).toFixed(1)} h)
          </span>
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <AiFillEdit onClick={onEdit} style={{ fontSize: "24px" }} />
          <FaTrash onClick={onRemove} style={{ fontSize: "24px" }} />
        </div>
      </div>
    </div>
  );
}
