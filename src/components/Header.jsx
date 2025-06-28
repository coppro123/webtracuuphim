import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
    return (
        <div className="p-4 flex justify-between top-0 left-0 w-full bg-black">
            <div className="flex items-center gap-8">
                <Link to="/home">
                    <h1 className="text-[30px] uppercase text-red-700 font-bold">
                        Movie
                    </h1>
                </Link>
                <nav className="hidden md:flex items-center space-x-5 text-white">
                    <Link to="/home" className="hover:text-red-700">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-red-700">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-red-700">
                        Contact
                    </Link>
                </nav>
            </div>

            <SearchBox></SearchBox>
        </div>
    );
};

export default Header;
