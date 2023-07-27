import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import docAuthReducer from './slices/docAuthSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    docAuth:docAuthReducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

// To use any slice, you need to bring it into the store..