import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "api/deleteProduct",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (query: string, thunkAPI: any): Promise<any> => {
    try {
      const resp = await axios.delete(
        `http://localhost:8000/products/${query}`
      );
      const response = resp.data;

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
});

export default counterSlice.reducer;
