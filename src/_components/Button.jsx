/* eslint-disable react/prop-types */

const Button = ({ btnType, title, handleClick, className, isLoading }) => {
  return (
    <button
      disabled={isLoading}
      type={btnType}
      className={`main-btn ${className}`}
      onClick={handleClick}
    >
      {isLoading && "Loading"}
      {!isLoading && title}
    </button>
  );
};

export default Button;
