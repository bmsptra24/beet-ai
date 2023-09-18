import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { currProjectSlice } from "./actions/currIdProject.slice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const reducer = {
  [currProjectSlice.name]: currProjectSlice.reducer,
};

const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
