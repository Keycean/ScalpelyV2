import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "../css/app.css"; // Import the Tailwind CSS
import Navbar from "./Components/Navbar"; // Import the Navbar component
import About from "./Pages/About";
import Location from "./Pages/Location";

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

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
            </div>
        );
    },
});
