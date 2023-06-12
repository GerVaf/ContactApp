import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: null,
  searchContacts: [],
  favouriteContacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    insertContact: (state, action) => {
      state.contacts = action.payload;
    },
    searchContactHome: (state, action) => {
      const searchData = state.contacts.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.searchContacts = searchData;
    },
    searchContactFav: (state, action) => {
      const searchData = state.favouriteContacts.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.searchContacts = searchData;
    },
    setSearchContactFav: (state) => {
      state.searchContacts = state.favouriteContacts;
    },
    setSearchContactHome: (state) => {
      state.searchContacts = state.contacts;
    },
    insertFavContact: (state, action) => {
      const isExist = state.favouriteContacts.find(
        (user) => user.id === action.payload.id
      );
      if (isExist) {
        const removeState = state.favouriteContacts.filter(
          (user) => user.id !== action.payload.id
        );
        state.favouriteContacts = removeState;
      } else {
        state.favouriteContacts = [...state.favouriteContacts, action.payload];
      }
    },
    removeFavContact: (state, action) => {
      const removeState = state.favouriteContacts.filter(
        (user) => user.id !== action.payload.id
      );
      state.favouriteContacts = removeState;
    },
  },
});

export const {
  insertContact,
  insertFavContact,
  removeFavContact,
  searchContactFav,
  searchContactHome,
  setSearchContactFav,
  setSearchContactHome,
} = contactSlice.actions;

export default contactSlice.reducer;
