import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterCartSlice from "./src/Redux/countCart";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './src/Redux/authSlice'

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"], // only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    count: counterCartSlice,
    reducer: persistedReducer
  },
});

export const persistor = persistStore(store);
