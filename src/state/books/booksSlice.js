import { createSlice } from "@reduxjs/toolkit";
import { bookFetch, booksFetch, createBook, updateBook } from "./booksActions";

const initialState = {
  books: null,
  book: null,

  fetchBooksError: null,
  fetchBooksSuccess: false,
  fetchBooksLoading: false,

  fetchBookError: null,
  fetchBookSuccess: false,
  fetchBookLoading: false,

  updateBookLoading: false,
  updateBookError: null,
  updateBookSuccess: false,

  createBookLoading: false,
  createBookError: null,
  createBookSuccess: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.fetchBooksError = null;
      state.fetchBookSuccess = false;
      state.fetchBooksLoading = false;

      state.updateBookError = null;
      state.updateBookSuccess = false;
      state.updateBookLoading = false;

      state.createBookError = null;
      state.createBookSuccess = false;
      state.createBookLoading = false;

      state.fetchBookError = null;
      state.fetchBookSuccess = false;
      state.fetchBookLoading = false;
    },
    clearbooks: (state) => {
      state.books = null;
      state.book = null;
      state.fetchBooksError = null;
      state.fetchBookSuccess = false;
      state.fetchBooksLoading = false;

      state.updateBookError = null;
      state.updateBookSuccess = false;
      state.updateBookLoading = false;

      state.createBookError = null;
      state.createBookSuccess = false;
      state.createBookLoading = false;

      state.fetchBookError = null;
      state.fetchBookSuccess = false;
      state.fetchBookLoading = false;
    },
  },
  extraReducers: {
    [booksFetch.pending]: (state) => {
      state.fetchBooksLoading = true;
    },
    [booksFetch.fulfilled]: (state, action) => {
      state.fetchBooksLoading = false;
      state.fetchBooksSuccess = true;
      state.books = action.payload;
    },
    [booksFetch.rejected]: (state, action) => {
      state.fetchBooksLoading = false;
      state.fetchBooksError = action.payload;
    },
    [bookFetch.pending]: (state) => {
      state.fetchBookLoading = true;
    },
    [bookFetch.fulfilled]: (state, action) => {
      state.fetchBookLoading = false;
      state.fetchBookSuccess = true;
      state.book = action.payload;
    },
    [bookFetch.rejected]: (state, action) => {
      state.fetchBookLoading = false;
      state.fetchBookError = action.payload;
    },

    [createBook.pending]: (state) => {
      state.createBookLoading = true;
    },
    [createBook.fulfilled]: (state, action) => {
      state.createBookLoading = false;
      state.createBookSuccess = true;
      state.book = action.payload;
    },
    [createBook.rejected]: (state, action) => {
      state.createBookLoading = false;
      state.createBookError = action.payload;
    },
    [updateBook.pending]: (state) => {
      state.updateBookLoading = true;
    },
    [updateBook.fulfilled]: (state, action) => {
      state.updateBookLoading = false;
      state.updateBookSuccess = true;
      state.book = action.payload;
    },
    [updateBook.rejected]: (state, action) => {
      state.updateBookLoading = false;
      state.updateBookError = action.payload;
    },
  },
});

export const { clearErrors, clearbooks } = booksSlice.actions;

//selectors
export const isLoading = (state) =>
  state.books.fetchBookLoading ||
  state.books.fetchBooksLoading ||
  state.books.updateBookLoading ||
  state.books.createBookLoading;

export default booksSlice.reducer;
