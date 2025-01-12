import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../css/app.css"; // Import the Tailwind CSS
import Navbar from "./Components/Navbar"; // Import the Navbar component
import About from "./Pages/About";
import Location from "./Pages/Location";
import Experience from "./Pages/Experience";
import Login from './Pages/Login';
import Footer from "./Components/Footer";


const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Scapely";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <div>
                <Navbar /> {/* Add the Navbar here */}
                <App {...props} />
                <About />
                <Location/>
                <Experience/>
                <Footer/>
        
            </div>
        );
    },
});
