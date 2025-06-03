import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { FaSearch, FaUserPlus, FaUsers } from 'react-icons/fa';
import Button from '../ui/Button';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const HowItWorks = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleJoinClick = (e) => {
        if (user) {
            e.preventDefault();
            toast.info("You're already logged in! Explore groups to join instead.", {
                position: "top-center",
                autoClose: 3000
            });
            setTimeout(() => navigate('/groups'), 1500);
        }
    };

    return (
        <motion.section
            className="py-16 bg-base-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <ToastContainer />
            <div className="px-6 md:px-12 lg:px-24 container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">How It Works</h2>
                    <p className="text-lg opacity-80">Join the HobbyHub community in three simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Discover */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link to="/groups" className="flex flex-col items-center py-6 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-base-content/10 rounded-full flex items-center justify-center mb-4">
                                <FaSearch className="text-base-content text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Discover</h3>
                            <p className="text-center opacity-80">Browse through our diverse collection of hobby groups in your local area.</p>
                        </Link>
                    </motion.div>

                    {/* Join */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            to="/register"
                            onClick={handleJoinClick}
                            className="flex flex-col items-center py-6 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-base-content/10 rounded-full flex items-center justify-center mb-4">
                                <FaUserPlus className="text-base-content text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Join</h3>
                            <p className="text-center opacity-80">Sign up and become a member of groups that match your interests and schedule.</p>
                        </Link>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link to="/groups" className="flex flex-col items-center py-6 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-base-content/10 rounded-full flex items-center justify-center mb-4">
                                <FaUsers className="text-base-content text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Connect</h3>
                            <p className="text-center opacity-80">Meet like-minded people, share experiences, and grow your passion together.</p>
                        </Link>
                    </motion.div>
                </div>

                <div className="flex justify-center mt-10">
                    <Link to={user ? "/createGroup" : "/login"}>
                        <Button variant="primary" size="lg">
                            {user ? "Create Your Own Group" : "Login to Create a Group"}
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default HowItWorks;