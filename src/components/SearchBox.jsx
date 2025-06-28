import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search/movie/${encodeURIComponent(query)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent border border-gray-500 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
