/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseInvoice } from "./types";
import { getInvoiceDetailsById } from "../../services/apis/common";

interface InvoiceState {
  invoice: ResponseInvoice;
  invoiceLoading: boolean;
}

const initialState: InvoiceState = {
  invoice: undefined as any,
  invoiceLoading: false,
};


export const getInvoiceDetailsByOrderRef = createAsyncThunk<
  ResponseInvoice,
  string,
  { rejectValue: any }
>("mapsReducer/getInvoiceDetailsByOrderRefAction", async (id, { rejectWithValue }) => {
  try {
    const response = await getInvoiceDetailsById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const InvoiceSlice = createSlice({
  name: "InvoiceReducer",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getInvoiceDetailsByOrderRef.pending, ($state, action) => {
        $state.invoiceLoading = true;
      })
      .addCase(getInvoiceDetailsByOrderRef.fulfilled, ($state, action) => {
        $state.invoiceLoading = false;
        $state.invoice = action.payload
      });
    /* ----------- */
  },
});

export const { } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
