import { useEffect } from "react";
import RocketCard from "@/components/RocketCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/Store";

interface RocketProps {
    selectedPage: number;

}


export default function Rocket({ selectedPage }: RocketProps) {
    const rocketList = useSelector((state: RootState) => state.displayList.value);
    const rocketsPerPage = 10;
    const indexOfLastRocket = selectedPage * rocketsPerPage;
    const indexOfFirstRocket = indexOfLastRocket - rocketsPerPage;
    const currentRockets = rocketList.slice(indexOfFirstRocket, indexOfLastRocket);

    useEffect(() => {

    }, [selectedPage]);

    return (
        <div className="flex flex-wrap justify-center gap-4 py-10 ">
            {
                currentRockets.length === 0
                    ? <div> No rockets found </div>
                    : currentRockets.map((rocket, index) =>
                        <RocketCard
                            static_fire_date_utc={rocket.static_fire_date_utc}
                            links={rocket.links}
                            rocket={rocket.rocket}
                            launch_site={rocket.launch_site}
                            mission_name={rocket.mission_name}
                            launch_date={new Date(rocket.launch_date_utc)}
                        />
                    )
            }
        </div>
    );
}