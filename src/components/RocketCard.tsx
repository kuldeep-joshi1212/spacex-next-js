interface RocketCardProps {
    static_fire_date_utc: string;
    links: {
        mission_patch: string;
        article_link: string;
        video_link: string;
    };
    rocket: {
        rocket_name: string;
    };
    launch_site: {
        site_name: string;
    };
    mission_name: string;
    launch_date: Date;
}
export default function RocketCard({
    static_fire_date_utc,links,rocket,launch_site,mission_name,launch_date
                                   }:RocketCardProps) {
    function formatDateUTC(date:Date) {
        const utcDate = new Date(date);
        const day = utcDate.getUTCDate().toString().padStart(2, '0');
        const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = utcDate.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    const launchDate = formatDateUTC(new Date(launch_date));
    return (
        <div className="flex flex-row items-center justify-between w-4/5  bg-white shadow-lg rounded ">
            <div className="flex flex-col items-center justify-center w-1/3 p-4 tablet:p-2">
                <img src={links?.mission_patch} alt="rocket" className="w-32 h-32 rounded-full tablet:w-24 h24" onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "/rocket-fallback.png"
                }}/>

                <h2 className="mt-4 text-xl font-bold tablet:text-sm laptop:text-xs">{rocket?.rocket_name}</h2>
            </div>

            <div><p className="mt-2 text-sm text-left text-gray-500 tablet:p-2" >Launched from {launch_site?.site_name} on {launchDate} for
                mission "{mission_name}".</p></div>
            <div className="flex flex-col justify-between gap-3.5 ">
            <a href={links?.article_link}>
                    <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md w-40 tablet:w-20 mx-2">View Details</button>
                </a>
                <a href={links?.video_link}>
                    <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md w-40 tablet:w-20 mx-2">View Video</button>
                </a>

            </div>
        </div>

    );
}