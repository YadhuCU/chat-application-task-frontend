import { configureStore } from "@reduxjs/toolkit";
import chatUsersSlice from "./chatUsersSlice";

export const store = configureStore({
  reducer: {
    chatUsersSlice: chatUsersSlice,
  },
});
