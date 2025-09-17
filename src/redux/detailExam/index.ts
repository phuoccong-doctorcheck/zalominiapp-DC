/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  HistoriesCustomerItem,
  HistoriesCustomerItemService,
} from "../dashboard/types";
import {
  fetchResultDetail,
  fetchVitalsignsCustomer,
} from "../../services/apis/dashboard";
import { ImagePreviewItem, ResponseVitalsignsCustomer } from "./types";

interface DetailExamState {
  listService: HistoriesCustomerItemService[];
  infoCustomerVitalsignsLoading: boolean;
  infoCustomerVitalsigns: ResponseVitalsignsCustomer;
  masterIdExam: string;
  resultParentLoading: boolean;
  resultParent: any;
  resultChildLoading: boolean;
  resultChild: any;
  dataImagePreview: ImagePreviewItem;
}

const initialState: DetailExamState = {
  listService: [],
  infoCustomerVitalsignsLoading: false,
  infoCustomerVitalsigns: undefined as any,
  masterIdExam: "",
  resultParent: null,
  resultParentLoading: false,
  resultChild: null,
  resultChildLoading: false,
  dataImagePreview: {
    visible: false,
    activeIndex: 0,
    images: [],
  },
};

export const getVitalsignsCustomer = createAsyncThunk<
  ResponseVitalsignsCustomer,
  string,
  { rejectValue: any }
>(
  "mapsReducer/getVitalsignsCustomerAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchVitalsignsCustomer(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* -------- */

export const getResultDetailParent = createAsyncThunk<
  any,
  any,
  { rejectValue: any }
>(
  "mapsReducer/getResultDetailParentAction",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetchResultDetail(body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getResultDetailChild = createAsyncThunk<
  any,
  any,
  { rejectValue: any }
>(
  "mapsReducer/getResultDetailChildAction",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetchResultDetail(body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const detailExamSlice = createSlice({
  name: "DetailExamReducer",
  initialState,
  reducers: {
    setListService(
      $state,
      action: PayloadAction<HistoriesCustomerItemService[]>
    ) {
      $state.listService = action.payload;
    },
    setMasterIdExam($state, action: PayloadAction<string>) {
      $state.masterIdExam = action.payload;
    },
    setImagePreview($state, action: PayloadAction<ImagePreviewItem>) {
      $state.dataImagePreview = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVitalsignsCustomer.pending, ($state, action) => {
        $state.infoCustomerVitalsignsLoading = true;
      })
      .addCase(getVitalsignsCustomer.fulfilled, ($state, action) => {
        $state.infoCustomerVitalsignsLoading = false;
        $state.infoCustomerVitalsigns = action.payload;
      });
    builder
      .addCase(getResultDetailParent.pending, ($state, action) => {
        $state.resultParentLoading = true;
      })
      .addCase(getResultDetailParent.fulfilled, ($state, action) => {
        $state.resultParentLoading = false;
        $state.resultParent = action.payload;
      });
    builder
      .addCase(getResultDetailChild.pending, ($state, action) => {
        $state.resultChildLoading = true;
      })
      .addCase(getResultDetailChild.fulfilled, ($state, action) => {
        $state.resultChildLoading = false;
        $state.resultChild = action.payload;
      });
  },
});

export const { setListService, setMasterIdExam, setImagePreview } =
  detailExamSlice.actions;

export default detailExamSlice.reducer;
