import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const booksFetch = createAsyncThunk(
  "books/booksFetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(
        `/application-test-v1.1/books?${new URLSearchParams(params).toString()}`
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const bookFetch = createAsyncThunk(
  "books/bookFetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { id } = params;
      if (!id) {
        throw new Error("id not found");
      }
      const { data } = await axios.get(`/application-test-v1.1/books/${id}`);

      return data.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/application-test-v1.1/books`, {
        data: params.values,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { _id, ...rest } = params;
      const { data } = await axios.put(
        `/application-test-v1.1/books/${_id}`,

        { data: { ...rest } }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
