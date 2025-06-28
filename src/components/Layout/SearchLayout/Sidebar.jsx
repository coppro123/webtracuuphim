import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { query } = useParams();
    const location = useLocation();

    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    const API_KEY = "d57196b3e2a5598de3813751eb4c1da1";

    const endpoints = {
        movie: "Movies",
        tv: "TV Shows",
        person: "People",
        keyword: "Keywords",
        collection: "Collections",
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const promises = Object.entries(endpoints).map(([key]) =>
                    axios
                        .get(`https://api.themoviedb.org/3/search/${key}`, {
                            params: {
                                api_key: API_KEY,
                                query: query,
                            },
                        })
                        .then((res) => ({ key, count: res.data.total_results }))
                );

                const resultsArr = await Promise.all(promises);

                const summary = {};
                resultsArr.forEach(({ key, count }) => {
                    summary[key] = count;
                });

                setResults(summary);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchData();
    }, [query]);

    return (
        <aside className="w-full sm:w-1/4 md:w-1/5 bg-white text-black rounded overflow-hidden mx-4 border">
            <div className="bg-cyan-500 text-white px-4 py-2 font-semibold">
                Search Results
            </div>

            {loading ? (
                <div className="p-4 text-gray-500">Loading...</div>
            ) : (
                <ul className="divide-y">
                    {Object.entries(endpoints).map(([key, label]) => (
                        <li key={key}>
                            <Link
                                to={`/search/${key}/${query}`}
                                className={`flex justify-between px-4 py-2 hover:bg-gray-100 ${
                                    location.pathname.includes(
                                        `/search/${key}/`
                                    )
                                        ? "bg-gray-200 font-semibold"
                                        : ""
                                }`}
                            >
                                <span>{label}</span>
                                <span className="text-sm">
                                    {results[key] ?? 0}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <p className="text-sm p-3 italic text-gray-500">
                Tip: Use 'y:' to filter by year. Example: star wars y:1977
            </p>
        </aside>
    );
}
