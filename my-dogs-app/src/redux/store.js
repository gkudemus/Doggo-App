import { configureStore } from "@reduxjs/toolkit";
import { dogBreedListSlice } from "./slices/dogBreedListSlice";

export const store = configureStore({
  reducer: {
    dogBreedData: dogBreedListSlice.reducer,
  },
});
