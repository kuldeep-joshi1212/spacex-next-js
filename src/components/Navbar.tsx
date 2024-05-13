'use client'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/GlobalRedux/Store";
import {rocketListSlice, setRocketList} from "@/app/GlobalRedux/RocketListSlice/RocketListSlice";
import {displayListSlice, DisplayListState, setDisplayList} from "@/app/GlobalRedux/DisplayListSlice/DisplayListSlice";
import {ChangeEvent, useEffect, useState} from "react";
import Rocket from "@/components/Rocket";

interface Rocket {
    launch_year: string,
    mission_name: string,
    launch_success: boolean,
    launch_date_utc: Date,
    launch_site: {site_name: string},
    rocket: {rocket_name: string},

    // Add other properties as needed
}

export default function Navbar() {
    const dispatch = useDispatch();
    const [years, setYears] = useState<string[]>([]);
    const rockets = useSelector((state: RootState) => state.rocketList.value);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [query, setQuery] = useState<string>('');
    const [filteredList, setFilteredList] = useState<DisplayListState[]>([]);
    const filterByParams = () => {
        const f=rockets.filter(rocket => (rocket.launch_year === selectedYear || selectedYear === "all" )
            && (rocket?.launch_success?.toString() === selectedStatus || selectedStatus === "all")
            && rocket.rocket.rocket_name.toLowerCase().includes(query.toLowerCase()));
        dispatch(setDisplayList(f));
    }
    const handleYearSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };
    const handleStatusSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    };
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    async function callAPI() {
        await fetch('/api/rocket')
            .then(async (response) => {
                const rockets: Rocket[] = await response.json();
                dispatch(setRocketList(rockets));
                dispatch(setDisplayList(rockets));

                // Extract unique years from the rockets data
                const uniqueYears: string[] = Array.from(new Set(rockets.map((rocket: Rocket) => rocket.launch_year.toString())));
                setYears(uniqueYears);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(() => {
        filterByParams();
}, [selectedYear,selectedStatus,query]);




    return (
        <nav className="navbar flex justify-between h-18 pt-2 pb-2 bg-green-600">
            <div className="logo w-40 flex justify-center items-center  ">
                <img src="/logo.png" alt="logo" className="w-18 19"/>
            </div>
            <ul className="flex justify-around gap-4 mr-10">
                <input type="text" placeholder="Search rockets " className="pl-2 border-2 block  w-200 rounded-sm" onChange={handleQueryChange} />
                <select id="year-select" className="border-2 block w-200 rounded-sm" onChange={handleYearSelectChange}>
                    <option value="all">All</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                {/*TODO:add values in dropdown via api data recieved*/}
                <select id="status-select" className="border-2 block w-200 rounded-sm" onChange={handleStatusSelectChange}>
                    <option value="all">All</option>
                    <option value="true">Success</option>
                    <option value="false">Failure</option>
                </select>
            </ul>
        </nav>
    );
}