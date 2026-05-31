import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTaskModalOpen: false,
  editTaskModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    openCreateTaskModal: (state) => {
      state.createTaskModalOpen = true;
    },

    closeCreateTaskModal: (state) => {
      state.createTaskModalOpen = false;
    },

    openEditTaskModal: (state) => {
      state.editTaskModalOpen = true;
    },

    closeEditTaskModal: (state) => {
      state.editTaskModalOpen = false;
    },
  },
});

export const {
  openCreateTaskModal,
  closeCreateTaskModal,
  openEditTaskModal,
  closeEditTaskModal,
} = uiSlice.actions;

export default uiSlice.reducer;