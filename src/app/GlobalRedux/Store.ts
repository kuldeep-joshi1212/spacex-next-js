'use client'
import {configureStore} from "@reduxjs/toolkit";
import rocketReducer from "@/app/GlobalRedux/RocketListSlice/RocketListSlice";
import displayReducer from "@/app/GlobalRedux/DisplayListSlice/DisplayListSlice";
export const store = configureStore({
    reducer: {
        rocketList: rocketReducer,
        displayList: displayReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;