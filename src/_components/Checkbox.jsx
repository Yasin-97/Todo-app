/* eslint-disable react/prop-types */
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

export default function Checkbox({ checked = false, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center" }}>
      {!checked && <ImCheckboxUnchecked style={{ fontSize: "24px" }} />}
      {checked && <ImCheckboxChecked style={{ fontSize: "24px" }} />}
    </div>
  );
}
