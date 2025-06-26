import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { ThemeContext } from '../context/ThemeContext';
import logo from '/logo.svg';
import Button from '../ui/Button';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import showAlert from '../ui/Alert';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const timeoutRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsProfileOpen(true);
    };

    const handleProfileMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsProfileOpen(false);
        }, 1000);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleLogout = async () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsProfileOpen(false);

        showAlert({
            title: 'Sign Out',
            text: 'Are you sure you want to sign out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Sign Out',
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    await logOut();
                    showAlert({
                        title: 'Success',
                        text: 'You have been signed out successfully',
                        icon: 'success'
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                    showAlert({
                        title: 'Error',
                        text: 'Failed to sign out. Please try again.',
                        icon: 'error'
                    });
                }
            }
        });
    };

    const navLinkStyles = ({ isActive }) => {
        return isActive ? "underline decoration-1 underline-offset-6" : "";
    };

    const mobileLinkStyles = ({ isActive }) => {
        return `block py-2 px-4 w-full text-left ${isActive ? "bg-base-200" : ""}`;
    };

    return (
        <div className="relative">
            <div className="navbar bg-base-100 px-6 md:px-12 lg:px-24 container mx-auto">
                <div className="navbar-start">
                    <div className="relative">
                        {/* Small screens: Button for mobile dropdown */}
                        <div className="lg:hidden">
                            <button
                                className="flex items-center text-2xl font-bold normal-case cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <img src={logo} alt="logo" className='w-8 h-8 mr-2' />
                                <span className="hidden md:inline">HobbyHub</span>
                            </button>
                        </div>

                        {/* Medium & Large screens: Link to home */}
                        <div className="hidden lg:block">
                            <Link
                                to="/"
                                className="flex items-center text-2xl font-bold normal-case cursor-pointer"
                            >
                                <img src={logo} alt="logo" className='w-8 h-8 mr-2' />
                                HobbyHub
                            </Link>
                        </div>

                        {/* Mobile dropdown menu */}
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-base-100 shadow-lg rounded-md z-50 lg:hidden">
                                <NavLink to="/" className={mobileLinkStyles} onClick={toggleMenu}>
                                    Home
                                </NavLink>
                                <NavLink to="/groups" className={mobileLinkStyles} onClick={toggleMenu}>
                                    All Groups
                                </NavLink>
                                <NavLink to="/about" className={mobileLinkStyles} onClick={toggleMenu}>
                                    About Us
                                </NavLink>
                                <NavLink to="/terms" className={mobileLinkStyles} onClick={toggleMenu}>
                                    Terms of Service
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-base font-medium px-1">
                        <li>
                            <NavLink
                                to="/"
                                className={navLinkStyles}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/groups"
                                className={navLinkStyles}
                            >
                                All Groups
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={navLinkStyles}
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/terms"
                                className={navLinkStyles}
                            >
                                Terms of Service
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <button
                        className="btn btn-ghost btn-circle mr-2"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>

                    {user ? (
                        <>
                            <Link to="/dashboard">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-5 text-sm md:text-base"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            <div
                                className="relative"
                                ref={profileRef}
                                onMouseEnter={handleProfileMouseEnter}
                                onMouseLeave={handleProfileMouseLeave}
                            >
                                <button
                                    className="flex items-center focus:outline-none cursor-pointer"
                                    aria-label="User menu"
                                >
                                    <div className="avatar">
                                        <div className="w-8 rounded-full ring ring-base-content ring-offset-base-100 ring-offset-2">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName || "User"}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="bg-base-300 text-base-content flex items-center justify-center h-full text-lg font-medium">
                                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg overflow-hidden z-20"
                                        onMouseEnter={handleProfileMouseEnter}
                                        onMouseLeave={handleProfileMouseLeave}
                                    >
                                        <div className="px-4 py-3 text-sm text-base-content border-b border-base-300">
                                            <div className="font-medium">{user.displayName || 'User'}</div>
                                            <div className="text-xs truncate">{user.email}</div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-base-200 cursor-pointer"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button
                                    variant='outline'
                                    size='md'
                                    className='mr-2 text-sm md:text-base'
                                >
                                    Login
                                </Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button
                                    variant="primary"
                                    size='md'
                                    className='text-sm md:text-base'
                                >
                                    Register
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent lg:hidden"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default Navbar;