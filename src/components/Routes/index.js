import About from "../About";
import Contact from "../Contact";
import Detail from "../Detail";
import Home from "../Home";
import Default from "../Layout/Default";
import SearchLayout from "../Layout/SearchLayout/SearchLayout";
import Search from "../Search";
import Collection from "../SearchResult/Collection";
import Keyword from "../SearchResult/Keyword";
import People from "../SearchResult/People";
import Person from "../SearchResult/Person";

const publicRoutes = [
    { path: "/search/person/:query", component: People, layout: SearchLayout },
    { path: "/collection/:id", component: Collection, layout: Default },
    {
        path: "/search/keyword/:query",
        component: Keyword,
        layout: SearchLayout,
    },

    { path: "/search/:type/:query", component: Search, layout: SearchLayout },

    { path: "/person/detail/:id", component: Person, layout: Default },

    { path: "/movie/:id", component: Detail, layout: Default },
    { path: "/tv/:id", component: Detail, layout: Default },

    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/about", component: About, layout: Default },
    { path: "/contact", component: Contact, layout: Default },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
