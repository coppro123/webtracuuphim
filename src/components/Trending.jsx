import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 6, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

export default function Trending() {
    const [films, setFilms] = useState([]);

    const fetchTrendingFilm = () => {
        const options = {
            method: "GET",
            url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };

        axios
            .request(options)
            .then((res) => {
                setFilms(res.data.results);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchTrendingFilm();
    }, []);

    return (
        <div className="my-5 px-10 max-w-full ">
            <h2 className="text-xl uppercase mb-4">Trending</h2>
            <Carousel responsive={responsive} draggable={false}>
                {films?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Carousel>
        </div>
    );
}
