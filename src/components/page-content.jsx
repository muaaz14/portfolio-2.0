import React from "react";

import Home from "../pages/home";
import About from "../pages/about";
import Work from "../pages/work";
import Contact from "../pages/contact";
import Playground from "../pages/playground";

import "./page-content.css";

function PageContent({ activePage}) {
    switch (activePage) {
        case "home": default: return <Home />;

        case "about": return <About />;

        case "work": return <Work />;

        case "contact": return <Contact />;

        case "playground": return <Playground />;
    }
}

export default PageContent;