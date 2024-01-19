import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { MyTripsType, UserState } from "../types";

const initialState: UserState = {
   user: null,
   token: null,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setLogin: (state, action: PayloadAction<UserState>) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
      },
      setTripList: (state, action: PayloadAction<MyTripsType[]>) => {
         state.user.myTrips = action.payload;
      },
      setWishList: (state, action: PayloadAction<any[]>) => {
         state.user.wishList = action.payload;
      },
   },

   // Reset REDUX/PERSIST state
   extraReducers: (builder) => {
      builder.addCase(PURGE, () => {
         return initialState;
      });
   },
});
export const { setLogin, setTripList, setWishList } = userSlice.actions;
export default userSlice.reducer;
