import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 8 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

export default function Detail() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [details, videos, credits, recs] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_API_KEY
                            }`,
                        },
                    }),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${id}/videos`,
                        {
                            headers: {
                                Authorization: `Bearer ${
                                    import.meta.env.VITE_API_KEY
                                }`,
                            },
                        }
                    ),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${id}/credits`,
                        {
                            headers: {
                                Authorization: `Bearer ${
                                    import.meta.env.VITE_API_KEY
                                }`,
                            },
                        }
                    ),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
                        {
                            headers: {
                                Authorization: `Bearer ${
                                    import.meta.env.VITE_API_KEY
                                }`,
                            },
                        }
                    ),
                ]);

                setShow(details.data);
                const trailer = videos.data.results.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailerKey(trailer?.key);
                setCast(credits.data.cast.slice(0, 10)); // top 10
                setRecommendations(recs.data.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDetails();
    }, [id]);

    const openTrailerModal = () => {
        setShowTrailerModal(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = "hidden";
    };

    const closeTrailerModal = () => {
        setShowTrailerModal(false);
        // Re-enable scrolling when modal is closed
        document.body.style.overflow = "auto";
    };

    if (!show) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Banner */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                    className="w-full h-[400px] object-cover opacity-30"
                    alt="Movie backdrop"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center px-10">
                    <div className="flex gap-8">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                            className="w-[200px] rounded shadow"
                            alt="Movie poster"
                        />
                        <div>
                            <h1 className="text-4xl font-bold">{show.title}</h1>
                            <p className="italic text-gray-300">
                                {show.title !== show.original_title &&
                                    `Original Title: ${show.original_title}`}
                                {show.release_date &&
                                    ` (${show.release_date.split("-")[0]})`}
                            </p>
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
                            <p className="mt-4 text-md max-w-xl">
                                {show.overview}
                            </p>

                            {trailerKey && (
                                <button
                                    onClick={openTrailerModal}
                                    className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                                >
                                    ▶️ Play Trailer
                                </button>
                            )}
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

            {/* Recommendations */}
            <div className="mt-12 px-10 pb-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Recommended Movies
                </h2>
                <Carousel responsive={responsive} infinite autoPlay>
                    {recommendations.map((movie) => (
                        <a href={`/movie/${movie.id}`} key={movie.id}>
                            <div className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-[160px] h-[240px] object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-[160px] h-[240px] bg-gray-800 rounded flex items-center justify-center">
                                        No Image
                                    </div>
                                )}
                                <p className="text-sm mt-2">{movie.title}</p>
                            </div>
                        </a>
                    ))}
                </Carousel>
            </div>

            {/* Trailer Modal */}
            {showTrailerModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl relative">
                        <button
                            onClick={closeTrailerModal}
                            className="absolute -right-4 -top-10 text-white bg-red-600 rounded-full p-2 hover:bg-red-700"
                            aria-label="Close trailer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-96 md:h-[500px]"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
