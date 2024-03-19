import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../store/todo-slice";
import { useState } from "react";

export default function TodoInputModal({ taskInfo }) {
  const isModalOpen = useSelector((state) => state.todo.isModalOpen);
  const dispatch = useDispatch();
  const [id, taskDesc] = taskInfo;

  const [userEditText, setUserEditText] = useState(taskDesc);

  function handleSaveEditedText(newDescription) {
    if (newDescription === "") {
      handleModalClose();
    } else {
      dispatch(todoActions.updateTask({ id, newDescription }));
      handleModalClose();
    }
  }

  function handleModalClose() {
    dispatch(todoActions.closeModal());
  }

  return (
    <Modal open={isModalOpen} onClose={() => handleModalClose}>
      <h3>Edit To-Do</h3>
      <div className="user-modal-edit-input">
        <input
          autoFocus
          type="text"
          value={userEditText}
          onChange={(e) => setUserEditText(e.target.value)}
          maxLength={30}
          required
        />
      </div>
      <p>
        <Button
          label="Save"
          color="primary"
          onClick={() => handleSaveEditedText(userEditText)}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          label="Close"
          color="secondary"
          onClick={handleModalClose}
          style={{ marginRight: "0.5rem" }}
        />
      </p>
    </Modal>
  );
}
