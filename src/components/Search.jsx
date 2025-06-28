import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
    const { type, query } = useParams();
    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (!query) return;

        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
                        query
                    )}&language=en-US&page=${currentPage}&include_adult=false`,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_API_KEY
                            }`,
                        },
                    }
                );
                setResults(res.data.results);
                setTotalPages(res.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error("Search error:", error);
            }
        };

        fetchData();
    }, [query, type, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center items-center mt-8 mb-4 space-x-2">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                        currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Prev
                </button>

                <div className="flex items-center">
                    <span className="mx-4">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                        currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4">
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {results.length > 0 ? (
                            results
                                .sort((a, b) => {
                                    const dateA = new Date(
                                        a.first_air_date ||
                                            a.release_date ||
                                            "1900-01-01"
                                    );
                                    const dateB = new Date(
                                        b.first_air_date ||
                                            b.release_date ||
                                            "1900-01-01"
                                    );
                                    return dateB - dateA; // Sort newest first
                                })
                                .map((show) => {
                                    let linkTo = `/${type}/${show.id}`;
                                    if (show.type === "collection") {
                                        linkTo = `/collection/detail/${show.id}`;
                                    }

                                    return (
                                        <Link to={linkTo} key={show.id}>
                                            <div className="flex bg-white rounded shadow-md p-4 hover:bg-gray-100 transition">
                                                <img
                                                    src={
                                                        show.poster_path
                                                            ? `https://image.tmdb.org/t/p/w92${show.poster_path}`
                                                            : show.backdrop_path
                                                            ? `https://image.tmdb.org/t/p/w92${show.backdrop_path}`
                                                            : "https://placehold.co/96x144"
                                                    }
                                                    alt={
                                                        show.name || show.title
                                                    }
                                                    className="w-24 h-auto mr-4 rounded"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-bold hover:text-gray-500">
                                                        {show.title ||
                                                            show.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        {show.first_air_date ||
                                                            show.release_date}
                                                    </p>
                                                    <p className="text-sm text-gray-800 line-clamp-2">
                                                        {show.overview}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-600">
                                    No results found for your search
                                </p>
                            </div>
                        )}
                    </div>
                    {renderPagination()}
                </>
            )}
        </div>
    );
}
