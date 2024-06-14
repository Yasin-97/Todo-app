/* eslint-disable react/prop-types */
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

export default function Checkbox({ checked = false, onClick }) {
  return (
    <div onClick={onClick} className="todo-checkbox">
      {!checked && <ImCheckboxUnchecked className="single-todo-icon" />}
      {checked && (
        <ImCheckboxChecked className="single-todo-icon single-todo-complete-icon" />
      )}
    </div>
  );
}
