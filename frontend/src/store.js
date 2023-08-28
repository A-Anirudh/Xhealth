import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import patientIdReducer from "./slices/patientIdSlice"
import aptIdReducer from './slices/patientIdSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    patientId:patientIdReducer,
    aptId :aptIdReducer ,
    [apiSlice.reducerPath]: apiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;

// To use any slice, you need to bring it into the store..