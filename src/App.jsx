import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes } from "./components/Routes";
import Default from "./components/Layout/Default";

function App() {
    return (
        <>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = Default;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    const Page = route.component;
                    console.log(Page);
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
