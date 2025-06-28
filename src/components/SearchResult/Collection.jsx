import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Collection() {
    const { id } = useParams();
    const [show, setShow] = useState(null);

    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [details, credits] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/collection/${id}`, {
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_API_KEY
                            }`,
                        },
                    }),
                    // axios.get(
                    //     `https://api.themoviedb.org/3/collection/${id}/videos`,
                    //     {
                    //         headers: {
                    //             Authorization: `Bearer ${
                    //                 import.meta.env.VITE_API_KEY
                    //             }`,
                    //         },
                    //     }
                    // ),
                    // axios.get(
                    //     `https://api.themoviedb.org/3/collection/${id}/credits`,
                    //     {
                    //         headers: {
                    //             Authorization: `Bearer ${
                    //                 import.meta.env.VITE_API_KEY
                    //             }`,
                    //         },
                    //     }
                    // ),
                ]);

                setShow(details.data);

                setCast(credits.data.cast.slice(0, 10)); // top 10
            } catch (err) {
                console.error(err);
            }
        };

        fetchDetails();
    }, [id]);

    if (!show) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen ">
            {/* Banner */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                    className="w-full h-[520px] object-cover opacity-30"
                    alt="Movie backdrop"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center px-10">
                    <div className="flex gap-8">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                            className="w-[300px] rounded shadow"
                            alt="Movie poster"
                        />
                        <div>
                            <h1 className="text-4xl font-bold">{show.name}</h1>

                            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-400">
                                {show.genres?.map((g) => (
                                    <span
                                        key={g.id}
                                        className="bg-gray-700 px-2 py-1 rounded"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl">Overview</h3>
                            <p className="mt-4 text-md max-w-xl">
                                {show.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cast */}
            <div className="mt-12 px-10">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {cast.map((actor) => (
                        <div key={actor.id} className="w-[120px] text-center">
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "https://via.placeholder.com/120x180?text=No+Image"
                                }
                                alt={actor.name}
                                className="w-full h-[180px] object-cover rounded mb-2"
                            />
                            <p className="text-sm">{actor.name}</p>
                            <p className="text-xs text-gray-400">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* List */}

            <div className="px-10">
                {show.parts?.map((movie) => (
                    <Link to={`/movie/${movie.id}`}>
                        <div
                            className="bg-white flex gap-4 mb-6 hover:bg-gray-50 rounded transition duration-300"
                            key={movie.id}
                        >
                            <img
                                className="w-[94px] h-[141px] object-cover rounded shadow"
                                src={`https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className="flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {movie.title}
                                        <span className="text-sm text-gray-500 ml-2">
                                            ({movie.original_title})
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Release Date: {movie.release_date}
                                    </p>
                                    <p className="text-sm text-gray-700 line-clamp-3">
                                        {movie.overview ||
                                            "No overview available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
