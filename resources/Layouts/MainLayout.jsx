// src/Layouts/MainLayout.jsx
import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;
