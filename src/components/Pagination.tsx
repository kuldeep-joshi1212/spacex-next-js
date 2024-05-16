'use client'
import {useSelector} from "react-redux";
import {RootState} from "@/app/GlobalRedux/Store";
import {useState} from "react";
import Rocket from "@/components/Rocket";

export default function Pagination() {
    const numberOfPages = useSelector((state: RootState) => Math.ceil(state.displayList.value.length / 10));
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < numberOfPages ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    return (
        <>
            <Rocket selectedPage={currentPage} />

            <div className="flex w-screen justify-center gap-2 py-10 ">
                {currentPage > 1 && (
                    <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={handlePrevPage}>
                        Previous
                    </button>
                )}
                {currentPage < numberOfPages && (
                    <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={handleNextPage}>
                        Next
                    </button>
                )}
            </div>
        </>
    );
}
