'use client'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/GlobalRedux/Store";
import { setRocketList} from "@/app/GlobalRedux/RocketListSlice/RocketListSlice";
import { DisplayListState, setDisplayList} from "@/app/GlobalRedux/DisplayListSlice/DisplayListSlice";
import {ChangeEvent, useEffect, useState} from "react";
import Rocket from "@/components/Rocket";
import {useRouter} from "next/navigation";

interface Rocket {
    launch_year: string,
    mission_name: string,
    launch_success: boolean,
    launch_date_utc: Date,
    launch_site: {site_name: string},
    rocket: {rocket_name: string},
}

export default function Navbar() {
    const dispatch = useDispatch()
    const router= useRouter();
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
    const handleLogout = () => {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // redirect('/login');
        router.push('/login');
        //TODO: redirect to login page without reload
    };

    async function callAPI() {
        await fetch('/api/rocket')
            .then(async (response) => {
                const rockets: Rocket[] = await response.json();
                dispatch(setRocketList(rockets));
                dispatch(setDisplayList(rockets));
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
        <nav className="navbar flex flex-col md:flex-row justify-between h-auto md:h-18 pt-2 pb-2 bg-green-600">
            <div className="logo w-full px-1 md:w-40 flex justify-center items-center mb-2 md:mx-2">
                <img src="/logo.png" alt="logo" className="w-18 19"/>
            </div>
            <div className="flex w-full gap-2 mr-3 md:w-auto">
                <input type="text" placeholder="Search rockets"
                       className="pl-2 border-2 block w-full rounded-sm mb-2 md:mb-0 mr-2 md:mr-0"
                       onChange={handleQueryChange}/>
                <select id="year-select" className="border-2 block w-32 rounded-sm mb-2 md:mb-0 mr-2 md:mr-0"
                        onChange={handleYearSelectChange}>
                    <option value="all">All</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select id="status-select" className="border-2 block w-32 rounded-sm mb-2 md:mb-0 mr-2 md:mr-0"
                        onChange={handleStatusSelectChange}>
                    <option value="all">All</option>
                    <option value="true">Success</option>
                    <option value="false">Failure</option>
                </select>
                <button onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10">
                    {/*TODO:adjust height of logout button*/}
                    Logout
                </button>
            </div>
        </nav>


    );
}