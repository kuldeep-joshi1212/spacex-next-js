'use client'
import {createSlice} from "@reduxjs/toolkit";
import {rocketListSlice} from "@/app/GlobalRedux/RocketListSlice/RocketListSlice";

interface DisplayList {
    launch_date_utc: string | number | Date;
    launch_success: string;
    launch_year: string;
    mission_name: string;
    launch_site: { site_name: string; };
    rocket: { rocket_name: string; };
    links: { mission_patch: string; article_link: string; video_link: string; };
    static_fire_date_utc: string;
    first_flight: string;
    status: string;
    name: string;
}
export interface DisplayListState{
    value: DisplayList[];
}
const initialState: DisplayListState = {
    value:[]
}
export const displayListSlice = createSlice({
    name: "displayList",
    initialState,
    reducers: {
        setDisplayList: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const  {setDisplayList} = displayListSlice.actions;
export default displayListSlice.reducer;
