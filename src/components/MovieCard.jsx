import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
    const title = movie.name || movie.title || movie.original_title;
    const bgImage = movie.poster_path
        ? `${import.meta.env.VITE_IMG_URL}${movie.poster_path}`
        : "";
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{ backgroundImage: `url(${bgImage})` }}
            onClick={handleClick}
        >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
                <h3 className="text-md uppercase text-white">{title}</h3>
            </div>
        </div>
    );
}
