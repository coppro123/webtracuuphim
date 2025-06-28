import React, { useEffect, useState } from "react";
import axios from "axios";
import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import IconPlay from "../assets/play-button.png";

export default function Banner() {
    const [banner, setBanner] = useState(null);

    const fetchTrendingFilm = () => {
        const options = {
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };

        axios
            .request(options)
            .then((res) => {
                setBanner(res.data.results[1]);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchTrendingFilm();
    }, []);

    if (!banner) {
        return <div>Loading...</div>; // Trả về loading nếu chưa có dữ liệu
    }

    // Chuyển đổi điểm đánh giá thành icon
    const renderRating = (rating) => {
        const fullStars = Math.floor(rating / 2); // Mỗi sao có giá trị 2 điểm
        const halfStar = rating % 2 !== 0; // Kiểm tra xem có nửa sao không

        let stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <img
                    src={IconRating}
                    alt="rating"
                    className="w-8 h-8"
                    key={i}
                />
            );
        }
        if (halfStar) {
            stars.push(
                <img
                    src={IconRatingHalf}
                    alt="rating"
                    className="w-8 h-8"
                    key="half"
                />
            );
        }
        return stars;
    };

    return (
        <div
            className="md:h-[600px] h-[1000px] w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path})`,
            }}
        >
            <div className="w-full h-full bg-black/40" />
            <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full">
                <div className="md:w-[50%] w-full">
                    <div className="flex flex-col space-y-6 items-start p-10">
                        <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
                            {banner.genre_ids ? "Movie" : "TV Show"}
                        </p>
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-[40px] font-bold text-white">
                                {banner.title || banner.name}
                            </h1>
                            <div className="flex items-center space-x-3">
                                {renderRating(banner.vote_average)}{" "}
                                {/* Hiển thị đánh giá */}
                            </div>
                            <p className="text-white">{banner.overview}</p>
                        </div>

                        <div className="flex items-center space-x-5">
                            <button className="py-2 px-3 bg-black text-white border border-black font-bold">
                                Chi tiết
                            </button>
                            <button className="py-2 px-3 bg-red-600 text-white font-bold">
                                Xem Phim
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:w-[50%] w-full flex items-center justify-center">
                    <div className="w-[300px] h-[400px] relative group">
                        <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                            <img
                                src={IconPlay}
                                alt="play"
                                className="w-16 h-16"
                            />
                        </button>
                        <img
                            src={`https://image.tmdb.org/t/p/original${banner.poster_path}`}
                            alt="banner"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
