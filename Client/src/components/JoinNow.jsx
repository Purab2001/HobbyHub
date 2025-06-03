import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import Button from '../ui/Button';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const JoinNow = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleJoinClick = (e) => {
        if (user) {
            e.preventDefault();

            toast.info("You're already a member! Explore groups to join.", {
                position: "top-center",
                autoClose: 3000
            });

            setTimeout(() => navigate('/groups'), 1500);
        }
    };

    return (
        <motion.section
            className="py-16 bg-base-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <ToastContainer />
            <div className="px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Find Your Hobby Community?
                </h2>

                <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                    Join thousands of people who have discovered new passions and made lasting
                    connections through HobbyHub.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    {user ? (
                        <Link to="/groups" onClick={handleJoinClick}>
                            <Button variant="primary" size="lg" className="min-w-[140px]">
                                Explore Groups
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <Button variant="primary" size="lg" className="min-w-[140px]">
                                Join Now
                            </Button>
                        </Link>
                    )}

                    <Link to="/about">
                        <Button
                            variant="outline"
                            size="lg"
                            className="min-w-[140px]"
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default JoinNow;