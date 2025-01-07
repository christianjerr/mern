import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type PayloadType = {
  name: string;
  price: string;
  image: string;
};

export const createProduct = createAsyncThunk(
  "api/createProduct",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (query: PayloadType, thunkAPI: any): Promise<any> => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/products/`,
        query,
        config
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
