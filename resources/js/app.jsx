import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "../css/app.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Scalpely";

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
                
                <Navbar />
                <App {...props} />
                <Footer />
            </div>
        );
    },
});