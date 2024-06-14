/* eslint-disable react/prop-types */
import ReactDom from "react-dom";

export default function Modal({ open, title, children, handleClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="font-semibold text-[18px] leading-[26px] text-left text-gray-100 truncate">
            {title}
          </h3>
          <button onClick={handleClose} className="modal-close-btn">
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
