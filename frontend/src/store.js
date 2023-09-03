import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import patientIdReducer from "./slices/patientIdSlice";
import aptIdReducer from "./slices/aptIdSlice";
import langReducer from "./slices/langSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		patientId: patientIdReducer,
		aptId: aptIdReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		language: langReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			apiSlice.middleware
		),
	devTools: true,
});

export default store;

// To use any slice, you need to bring it into the store..
