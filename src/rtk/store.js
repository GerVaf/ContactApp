import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import modalSlice from "./features/modalSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { api } from "./services/api";
import userSlice from "./features/userSlice";
import contactSlice from "./features/contactSlice";

const persisConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['userSlice']
};

const reducers = combineReducers({
  modalSlice: modalSlice,
  userSlice: userSlice,
  contactSlice: contactSlice,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persisConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(api.middleware),
});
