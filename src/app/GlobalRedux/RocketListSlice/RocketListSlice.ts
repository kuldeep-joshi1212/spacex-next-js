'use client'
import {createSlice} from "@reduxjs/toolkit";

interface Rocket {
    rocket_name: string;
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

export interface RocketListState{
    value: Rocket[];
}

const initialState: RocketListState = {
    value: [],
};


export const rocketListSlice = createSlice({
    name: "rocketList",
    initialState,
    reducers: {
        setRocketList: (state, action) => {
            state.value = action.payload;
        },
        filterByYearAndStatus: (state, action) => {
            state.value = state.value.filter((rocket) => (rocket.launch_year.includes(action.payload.year) || action.payload.year=="all")
                && (rocket.status === action.payload.status || action.payload.status=="all"));
        }
    }
});

export const {setRocketList} = rocketListSlice.actions;
export default rocketListSlice.reducer;