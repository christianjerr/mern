import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CounterState {
  data: {
    _id: string;
    name: string;
    price: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  isLoading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  data: [
    {
      _id: "",
      name: "",
      price: 0,
      image: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  ],
  isLoading: false,
  error: false,
};

export const getProducts = createAsyncThunk(
  "api/getProducts",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (thunkAPI: any): Promise<any> => {
    try {
      const resp = await axios.get("http://localhost:8000/products");
      const response = resp.data;

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getProducts.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getProducts.rejected, (state, _action) => {
      state.error = true;
    });
  },
});

export default counterSlice.reducer;
