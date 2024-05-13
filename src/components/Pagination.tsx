'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/Store";
import { useState } from "react";
import Rocket from "@/components/Rocket";

export default function Pagination() {
    const numberOfPages = useSelector((state: RootState) => Math.ceil(state.displayList.value.length / 10));
    const [selectedButton, setSelectedButton] = useState(1);

    const handleClick = (number:number) => {
        setSelectedButton(number);
    };

    return (
        <>
            <Rocket selectedPage={selectedButton || 1} />

        <div className="flex justify-center gap-2 py-10">

            {[...Array(numberOfPages)].map((_, i) => (
                <button
                    key={i}
                    className={`bg-gray-300 px-4 py-2 rounded-md ${selectedButton === i + 1 ? "selected-button bg-green-600" : ""}`}
                    onClick={() => handleClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
        </>
    );
}