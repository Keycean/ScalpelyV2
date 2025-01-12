import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

const Router = () => {
    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default Router;
