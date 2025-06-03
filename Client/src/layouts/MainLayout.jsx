import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '../ui/ScrollToTop';
 
const MainLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Outlet></Outlet>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};
 
export default MainLayout;