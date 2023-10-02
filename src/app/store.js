import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../state/books/booksSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
