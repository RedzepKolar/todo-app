import { createSlice } from "@reduxjs/toolkit";
import { generateRandomID } from "../util/helper";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    isModalOpen: false,
    filterMode: "All",
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: generateRandomID(),
        taskDescription: action.payload,
        isChecked: false,
      });
    },
    removeTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTask(state, action) {
      const { id, newDescription } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);

      if (index !== -1) {
        const updatedTask = {
          ...state.tasks[index],
          taskDescription: newDescription ?? state.tasks[index].taskDescription,
          isEditing: false,
        };

        state.tasks[index] = updatedTask;
      }
    },

    checkboxClicked(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },

    openModal(state) {
      state.isModalOpen = true;
    },

    closeModal(state) {
      state.isModalOpen = false;
    },
    filter(state, action) {
      state.filterMode = action.payload;
    },
    clearCompleted(state) {
      const todos = state.tasks.filter((item) => !item.isChecked);
      state.tasks = todos;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
