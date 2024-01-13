import {
  configureStore,
  createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (action) =>
    action !== null &&
    ![FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER].includes(action.type),
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serializableMiddleware),
});

export let presistor = persistStore(store);
