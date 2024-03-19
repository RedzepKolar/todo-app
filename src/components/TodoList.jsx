import { useEffect, useState } from "react";
import Button from "./UI/Button";
import Checkbox from "./UI/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todo-slice";
import TodoListActions from "./TodoListControls";
import TodoInputModal from "./TodoInputModal";

export default function TodoList() {
  const data = useSelector((state) => state.todo.tasks);
  const filter = useSelector((state) => state.todo.filterMode);
  const modalStore = useSelector((state) => state.todo.isModalOpen);

  const dispatch = useDispatch();

  const [userEditText, setUserEditText] = useState("");
  const [editedInfo, setEditedInfo] = useState([
    {
      editedTaskId: null,
      editedTaskText: "",
    },
  ]);

  let filtered = data;

  if (filter == "Active") {
    filtered = data.filter((item) => !item.isChecked);
  } else if (filter == "Completed") {
    filtered = data.filter((item) => item.isChecked);
  }

  useEffect(() => {
    if (filtered.length > 0 && userEditText === "") {
      setUserEditText(filtered[0].taskDescription);
    }
  }, [filtered, userEditText]);

  function onCheckboxChange(id) {
    dispatch(todoActions.checkboxClicked(id));
  }

  function handleOpenModal(taskId, taskDesc) {
    setEditedInfo([taskId, taskDesc]);
    dispatch(todoActions.openModal());
  }

  function onRemoveItem(id) {
    dispatch(todoActions.removeTask(id));
  }

  function deleteAllCompletedTasks() {
    dispatch(todoActions.clearCompleted());
  }

  if (data.length === 0) {
    return;
  }

  return (
    <div id="user-todos-result-container" className="elevated-table">
      {filtered.map((item) => (
        <div key={item.id}>
          <div className="row">
            <div>
              <Checkbox
                onChange={() => onCheckboxChange(item.id)}
                checked={item.isChecked}
              />
            </div>
            <div className="user-todos-result">
              <p className={item.isChecked ? "crossed-out" : ""}>
                {item.taskDescription}
              </p>
            </div>
            {modalStore && <TodoInputModal taskInfo={editedInfo} />}
            <div className="buttons">
              <Button
                label="Edit"
                color="secondary"
                onClick={() => handleOpenModal(item.id, item.taskDescription)}
                style={{ marginRight: "0.5rem" }}
              />
              <Button
                label="Remove"
                color="danger"
                onClick={() => onRemoveItem(item.id)}
              />
            </div>
          </div>
          <hr />
        </div>
      ))}

      <TodoListActions onClearClicked={deleteAllCompletedTasks} />
    </div>
  );
}
