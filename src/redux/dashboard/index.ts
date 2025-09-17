/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchServicePackage,
  fetchHistoriesCustomer,
  fetchPrescriptionCustomer,
  fetchServicePackageDetail,
  fetchServicePackageGroup,
  fetchProfileByPhone,
  getMessage,
  getAffiliateCode,
  getGift,
  fetchResultSurvey,
  // fetchVideoReview,
} from "../../services/apis/dashboard";
import {
  ApiResponseSurvey,
  GiftItem,
  PrescriptionItem,
  ProfileData,
  ResponseAffiliateCode,
  ResponseGift,
  ResponseHistoriesCustomer,
  ResponseNotify,
  ResponsePackageService,
  ResponsePackageServiceGroup,
  ResponsePrescription,
  ResponseServicePackage,
  ResponseVideo,
  ServicePackageItem,
} from "./types";
import { setStorage } from "zmp-sdk/apis";

interface DashBoardState {
  loadingPackageService: boolean;
  packageService: ResponseServicePackage;
  packageServiceGroup: ResponsePackageServiceGroup;
  /* ----------- */
  loadingPackageDetailService: boolean;
  packageServiceDetail: ResponsePackageService;
  PackageDetailItem: ServicePackageItem;
  /* ----------- */
  loadingVideoReview: boolean;
  videoReview: ResponseVideo;
  /* ----------- */
  loadingHistoriesCustomer: boolean;
  historiesCustomer: ResponseHistoriesCustomer;
  /* ----------- */
  loadingPrescriptionCustomer: boolean;
  prescriptionCustomer: ResponsePrescription;
  prescriptionCustomerItem: PrescriptionItem;
  /* ----------- */
  profile: ProfileData;
  notifyLoading: boolean;
  notify: ResponseNotify;
  affiliateCode: ResponseAffiliateCode;
  loadingaffiliateCode: boolean;
  platform: "android" | "iOS" | "";
  gift: GiftItem;
  avatar: string;
  storeGift: ResponseGift,
  loadingGift: boolean,
  /*------*/
  loadingSurveyCustomer: boolean;
  SurveyCustomer: ApiResponseSurvey;
}

const initialState: DashBoardState = {
  loadingPackageService: false,
  packageService: undefined as any,
  packageServiceGroup: undefined as any,
  /* ----------- */
  loadingPackageDetailService: false,
  packageServiceDetail: undefined as any,
  PackageDetailItem: undefined as any,
  /* ----------- */
  loadingVideoReview: false,
  videoReview: undefined as any,
  /* ----------- */
  loadingHistoriesCustomer: false,
  historiesCustomer: undefined as any,
  /* ----------- */
  loadingPrescriptionCustomer: false,
  prescriptionCustomer: undefined as any,
  prescriptionCustomerItem: undefined as any,
  profile: undefined as any,
  notify: undefined as any,
  notifyLoading: false,
  affiliateCode: undefined as any,
  loadingaffiliateCode: false,
  platform: "",
  gift: undefined as any,
  avatar: "",
  storeGift: undefined as any,
  loadingGift: false,

  /* ----------- */
  loadingSurveyCustomer: false,
  SurveyCustomer: undefined as any,
};

export const getServicePackage = createAsyncThunk<
  ResponseServicePackage,
  void,
  { rejectValue: any }
>("mapsReducer/getServicePackageAction", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchServicePackage();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getServicePackageGroup = createAsyncThunk<
  ResponsePackageServiceGroup,
  void,
  { rejectValue: any }
>(
  "mapsReducer/getServicePackageGroupAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchServicePackageGroup();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getServicePackageDetail = createAsyncThunk<
  ResponsePackageService,
  string,
  { rejectValue: any }
>(
  "mapsReducer/getServicePackageDetailAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchServicePackageDetail(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getHistoriesCustomer = createAsyncThunk<
  ResponseHistoriesCustomer,
  string,
  { rejectValue: any }
>("mapsReducer/getHistoriesCustomerAction", async (id, { rejectWithValue }) => {
  try {
    console.log(id)
    const response = await fetchHistoriesCustomer(id);
    console.log(response)
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getSurveyByCustomerID = createAsyncThunk<
ApiResponseSurvey,
  string,
  { rejectValue: any }
>("mapsReducer/getSurveyByCustomerIDAction", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchResultSurvey(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getPrescriptionCustomer = createAsyncThunk<
  ResponsePrescription,
  string,
  { rejectValue: any }
>(
  "mapsReducer/getPrescriptionCustomerAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPrescriptionCustomer(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getProfileByPhone = createAsyncThunk<
  any,
  any,
  { rejectValue: any }
>("mapsReducer/getProfileByPhoneAction", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchProfileByPhone(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const geNotification = createAsyncThunk<
  ResponseNotify,
  any,
  { rejectValue: any }
>("mapsReducer/geNotificationAction", async (id, { rejectWithValue }) => {
  try {
    const response = await getMessage(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const handleGetAffiliateCode = createAsyncThunk<
  ResponseAffiliateCode,
  any,
  { rejectValue: any }
>("mapsReducer/getAffiliateCodeAction", async (id, { rejectWithValue }) => {
  try {
    const response = await getAffiliateCode(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const handleGetGiftMember = createAsyncThunk<
  ResponseGift,
  any,
  { rejectValue: any }
>("mapsReducer/handleGetGiftMemberAction", async (_, { rejectWithValue }) => {
  try {
    const response = await getGift();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const dashboardSlice = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {
    setProfile($state, action: PayloadAction<ProfileData>) {
      $state.profile = action.payload;
    },
    setDetailPackageItem($state, action: PayloadAction<ServicePackageItem>) {
      $state.PackageDetailItem = action.payload;
    },
    setPrescriptionCustomerItem(
      $state,
      action: PayloadAction<PrescriptionItem>
    ) {
      $state.prescriptionCustomerItem = action.payload;
    },
    setGiftActive($state, action: PayloadAction<GiftItem>) {
      $state.gift = action.payload;
    },
    setAvatar($state, action: PayloadAction<string>) {
      $state.avatar = action.payload;
    },
    setDefaultPrescription( $state, action: PayloadAction ) {
      $state.prescriptionCustomer = undefined as any;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getServicePackage.pending, ($state, action) => {
        $state.loadingPackageService = true;
      })
      .addCase(getServicePackage.fulfilled, ($state, action) => {
        $state.loadingPackageService = false;
        $state.packageService = action.payload;
      });
    /* ----------- */
    builder.addCase(getServicePackageGroup.fulfilled, ($state, action) => {
      $state.packageServiceGroup = action.payload;
    });
    /* ----------- */
    builder
      .addCase(getServicePackageDetail.pending, ($state, action) => {
        $state.loadingPackageDetailService = true;
      })
      .addCase(getServicePackageDetail.fulfilled, ($state, action) => {
        $state.loadingPackageDetailService = false;
        $state.packageServiceDetail = action.payload;
      });
    /* ----------- */
    // builder
    //   .addCase(getVideoReview.pending, ($state, action) => {
    //     $state.loadingVideoReview = true;
    //   })
    //   .addCase(getVideoReview.fulfilled, ($state, action) => {
    //     $state.loadingVideoReview = false;
    //     $state.videoReview = action.payload;
    //   });
    /* ----------- */
    builder
      .addCase(getHistoriesCustomer.pending, ($state, action) => {
        $state.loadingHistoriesCustomer = true;
      })
      .addCase(getHistoriesCustomer.fulfilled, ($state, action) => {
        $state.loadingHistoriesCustomer = false;
        $state.historiesCustomer = action.payload;
      });
    /* ----------- */
    builder
      .addCase(getPrescriptionCustomer.pending, ($state, action) => {
        $state.loadingPrescriptionCustomer = true;
      })
      .addCase(getPrescriptionCustomer.fulfilled, ($state, action) => {
        $state.loadingPrescriptionCustomer = false;
        $state.prescriptionCustomer = action.payload;
      });
    /* ----------- */
    builder
      .addCase(geNotification.pending, ($state, action) => {
        $state.notifyLoading = true;
      })
      .addCase(geNotification.fulfilled, ($state, action) => {
        $state.notifyLoading = false;
        $state.notify = action.payload;
      });
    /* ----------- */
    builder.addCase(getProfileByPhone.fulfilled, ($state, action) => {
      const { data } = action.payload;
      setStorage({
        data: {
          profile: data,
        },
        success: (data) => {
          console.log(
            "🚀 ~ file: redux -> dashboard - line:230 -> getProfileByPhone:",
            data
          );
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        },
      });
      $state.profile = action.payload;
    });
    /* ----------- */
    builder
      .addCase(handleGetAffiliateCode.pending, ($state, action) => {
        $state.loadingaffiliateCode = true;
      })
      .addCase(handleGetAffiliateCode.fulfilled, ($state, action) => {
        $state.loadingaffiliateCode = false;
        $state.affiliateCode = action.payload;
      });
    /* ----------- */
    builder
      .addCase(handleGetGiftMember.pending, ($state, action) => {
        $state.loadingGift = true;
      })
      .addCase(handleGetGiftMember.fulfilled, ($state, action) => {
        $state.loadingGift = false,
        $state.storeGift = action.payload;
      });
    /* ----------- */
     /* ----------- */
     builder
     .addCase(getSurveyByCustomerID.pending, ($state, action) => {
       $state.loadingSurveyCustomer = true;
     })
     .addCase(getSurveyByCustomerID.fulfilled, ($state, action) => {
       $state.loadingSurveyCustomer = false,
       $state.SurveyCustomer = action.payload;
     });
   /* ----------- */
  },
});

export const {
  setDetailPackageItem,
  setPrescriptionCustomerItem,
  setProfile,
  setGiftActive,
  setAvatar,
  setDefaultPrescription,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
