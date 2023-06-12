import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: null,
    info: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    insertUser: (state, action) => {
      state.user.token = action.payload.token;
      state.user.info = action.payload.user;
    },
    removeUser: (state) => {
      state.user.token = null;
      state.user.info = null;
    },
  },
});

export const { insertUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
