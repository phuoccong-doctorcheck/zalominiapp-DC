/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateRegister } from "./types";

interface RegisterState {
  stateRegister: StateRegister;
}

const initialState: RegisterState = {
  stateRegister: {
    day_of_birth: 1,
    month_of_birth: 1,
    year_of_birth: 2000,
    customer_identity_card: "",
    customer_phone: "",
    customer_fullname: "",
    customer_email: "",
    gender_id: "",
    launch_source_id: "",
    customer_address: "",
    country_id: "",
    dependent_code: "",
  },
};

export const RegisterSlice = createSlice({
  name: "RegisterReducer",
  initialState,
  reducers: {
    setDataRegister($state, action: PayloadAction<StateRegister>) {
      $state.stateRegister = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setDataRegister } = RegisterSlice.actions;

export default RegisterSlice.reducer;
