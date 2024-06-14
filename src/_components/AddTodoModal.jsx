/* eslint-disable react/prop-types */
import Modal from "./Modal";
import Button from "./Button";
import FormField from "./FormField";

const AddTodoModal = ({
  data,
  isModalOpen,
  handleClose,
  handleSubmit,
  handleChange,
}) => {
  return (
    <Modal title={"ADD TODO"} open={isModalOpen} handleClose={handleClose}>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <FormField
          labelName="Todo"
          placeholder="Add New Todo"
          inputType="text"
          value={data.todo}
          handleChange={(e) => handleChange("todo", e)}
        />
        <FormField
          labelName="Estimation"
          placeholder="Estimate Time In Minutes"
          inputType="numebr"
          value={data.estimation}
          handleChange={(e) => handleChange("estimation", e)}
        />
        <div className="form-btn-container">
          <Button
            btnType="submit"
            title={"Add Todo"}
            className="form-btn-add"
          />
          <Button
            btnType="button"
            title="Cancel"
            className="form-btn-cancel"
            handleClick={handleClose}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
