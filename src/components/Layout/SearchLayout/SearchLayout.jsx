import React from "react";
import Header from "../../Header";
import Sidebar from "./Sidebar";

export default function SearchLayout({ children }) {
    return (
        <>
            <Header />
            <div className="flex items-start min-h-screen mt-8 pl-60 pr-60">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
}
