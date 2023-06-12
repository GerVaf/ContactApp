import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userModal: false,
  contactModal: {
    isOpen: false,
    id: null,
  },
  LeftBarOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleUserModal: (state) => {
      state.userModal = !state.userModal;
    },
    handleContactModal: (state, action) => {
      if (state.contactModal.isOpen) {
        state.contactModal.isOpen = false;
      } else {
        state.contactModal.isOpen = true;
        state.contactModal.id = action.payload;
      }
    },
    closeContactModal: (state) => {
      state.contactModal.isOpen = false;
    },
    LeftBarOpen: (state) => {
      state.LeftBarOpen = true;
    },
    LeftBarClose: (state) => {
      state.LeftBarOpen = false;
    },
  },
});

export const {
  handleContactModal,
  handleUserModal,
  closeContactModal,
  LeftBarOpen,
  LeftBarClose,
} = modalSlice.actions;

export default modalSlice.reducer;
