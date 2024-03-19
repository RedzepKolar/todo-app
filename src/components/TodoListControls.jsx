import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../store/todo-slice";
import Button from "./UI/Button";

export default function TodoListControls({ onClearClicked }) {
  const labelClass = "btn-label-span";
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todo.filterMode);

  return (
    <div className="bottom-actions-container">
      <div className="center-button-container">
        <Button
          label="All"
          labelProp={`${labelClass} ${filter === "All" ? "active" : ""}`}
          onClick={() => dispatch(todoActions.filter("All"))}
        />
        <Button
          label="Active"
          labelProp={`${labelClass} ${filter === "Active" ? "active" : ""}`}
          onClick={() => dispatch(todoActions.filter("Active"))}
        />
        <Button
          label="Completed"
          labelProp={`${labelClass} ${filter === "Completed" ? "active" : ""}`}
          onClick={() => dispatch(todoActions.filter("Completed"))}
        />
      </div>
      <div className="clear-button-container">
        <Button
          label="Clear completed"
          labelProp={labelClass}
          onClick={onClearClicked}
        />
      </div>
    </div>
  );
}
