import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
type PayloadType = {
  id: string;
  payload: {
    name: string;
    price: string;
    image: string;
  };
};
export const editProduct = createAsyncThunk(
  "api/editProduct",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (query: PayloadType, thunkAPI: any): Promise<any> => {
    try {
      const resp = await axios.put(
        `http://localhost:8000/products/${query.id}`,
        query.payload,
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
