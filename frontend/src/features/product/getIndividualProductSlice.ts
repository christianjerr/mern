import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IndividualProductState {
  data: {
    _id: string;
    name: string;
    price: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isLoading: boolean;
  error: boolean;
}

const initialState: IndividualProductState = {
  data: {
    _id: "",
    name: "",
    price: 0,
    image: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },

  isLoading: false,
  error: false,
};
export const getIndividualProduct = createAsyncThunk(
  "api/getIndividualProduct",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (query: string, thunkAPI: any): Promise<any> => {
    try {
      const resp = await axios.get(`http://localhost:8000/products/${query}`);
      const response = resp.data;
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const individualProduct = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getIndividualProduct.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(getIndividualProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getIndividualProduct.rejected, (state, _action) => {
      state.error = true;
    });
  },
});

export default individualProduct.reducer;
