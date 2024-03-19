import { useState } from "react";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo-slice";

export default function InputAddTask() {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleAddItem() {
    if (inputValue.trim() !== "") {
      dispatch(todoActions.addTask(inputValue));
      setInputValue("");
    }
  }

  return (
    <section id="user-input" className="elevated-table">
      <div className="user-input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task"
          maxLength={30}
        />
        <Button
          label="Add"
          color="primary"
          onClick={handleAddItem}
          disabled={inputValue === ""}
        />
      </div>
    </section>
  );
}
