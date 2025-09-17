/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormBooking, ResponseGetAppointment, ResponseGetProfiles } from "./types";
import moment from "moment";
import { fetchAppointment } from "../../services/apis/booking";
import { getListProfile } from "../../services/apis/dashboard";

interface BookingState {
  formBooking: FormBooking;
  getBooking: ResponseGetAppointment;
  detailBooking: any;
  loadingGetBooking: boolean;
  dataProfiles: ResponseGetProfiles;
  loadingGetProfile: boolean;
}

const initialState: BookingState = {
  formBooking: {
    clinic_id: 2,
    customer_id: "",
    appointment_datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
    appointment_note: "",
    is_exams: true,
    is_register_package: false,
    package_name: "Khám nội tiêu hóa",
    data: "LK001",
    time_id: 0,
    package_price: 200000,
    time_value: "",
    dateTime: new Date(),
    symptom: [],
    other_symptoms: "",
    profileName: '',
    profileId: '',
  },
  loadingGetBooking: false,
  getBooking: undefined as any,
  detailBooking: undefined as any,
  dataProfiles: undefined as any,
  loadingGetProfile: false,
};

export const getAppointmentByCustomerId = createAsyncThunk<
  ResponseGetAppointment,
  string,
  { rejectValue: any }
>(
  "mapsReducer/getAppointmentByCustomerIdAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchAppointment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getProfilesByUsername = createAsyncThunk<
  ResponseGetProfiles,
  string,
  { rejectValue: any }
>(
  "mapsReducer/getProfilesByUsernameAction",
  async (username, { rejectWithValue }) => {
    try {
      const response = await getListProfile(username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const BookingSlice = createSlice({
  name: "BookingReducer",
  initialState,
  reducers: {
    setFormBooking($state, action: PayloadAction<FormBooking>) {
      $state.formBooking = action.payload;
    },
    setBookingDetail($state, action: PayloadAction<FormBooking>) {
      $state.detailBooking = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAppointmentByCustomerId.pending, ($state, action) => {
      $state.loadingGetBooking = true;
    });
    builder.addCase(getAppointmentByCustomerId.fulfilled, ($state, action) => {
      $state.loadingGetBooking = false;
      $state.getBooking = action.payload;
    });
    // Get profile by username
    builder.addCase(getProfilesByUsername.pending, ($state, action) => {
      $state.loadingGetProfile = true;
    });
    builder.addCase(getProfilesByUsername.fulfilled, ($state, action) => {
      $state.loadingGetProfile = false;
      $state.dataProfiles = action.payload;
    });
  },
});

export const { setFormBooking, setBookingDetail } = BookingSlice.actions;

export default BookingSlice.reducer;
