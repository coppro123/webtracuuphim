import React from "react";
import Banner from "./Banner";
import Trending from "./Trending";
import Popular from "./Popular";

export default function Home() {
    return (
        <>
            <Banner></Banner>
            <Trending></Trending>
            <Popular></Popular>
        </>
    );
}
