import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Listing } from "../types";

type InitialState = {
   listings: Listing[] | null;
};

const initialState: InitialState = {
   listings: null,
};

export const listingSlice = createSlice({
   name: "listing",
   initialState,
   reducers: {
      setListing: (state, action: PayloadAction<Listing[]>) => {
         state.listings = action.payload;
      },
   },
});
export const { setListing } = listingSlice.actions;
export default listingSlice.reducer;
