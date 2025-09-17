/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dashboardReducer from "../dashboard/index";
import detailExamReducer from "../detailExam/index";
import bookingReducer from "../booking/index";
import registerReducer from '../register/index'
import invoiceReducer from '../invoice/index'
// Initialize config for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // List of reducers you want to store
};

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  detail: detailExamReducer,
  booking: bookingReducer,
  register: registerReducer,
  invoice: invoiceReducer,
});

// Apply Redux Persist to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
// Create persistor to use for Redux Persist initialization
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
