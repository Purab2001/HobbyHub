import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaUsers } from 'react-icons/fa';
import Button from '../ui/Button';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading-animation.json';
import HobbyCard from '../assets/HobbyCard.jpg'

const FeaturedGroups = () => {
    const [featuredGroups, setFeaturedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('https://hobby-hub-server.vercel.app/groups?limit=6');

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const data = await response.json();
                setFeaturedGroups(data.slice(0, 6));
            } catch (err) {
                console.error('Error fetching groups:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) {
        return (
            <div className="py-16 flex flex-col items-center justify-center">
                <Lottie
                    animationData={loadingAnimation}
                    style={{ width: 200, height: 200 }}
                />
                <p className="text-lg mt-4">Loading featured groups...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16 text-center">
                <p className="text-red-500">Error: {error}</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <motion.section
            className="py-16 bg-base-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="px-6 md:px-12 lg:px-24 container mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Hobby Groups</h2>
                    <p className="text-lg opacity-70">
                        Join these popular groups in your area and connect with people who share your passion.
                    </p>
                </div>

                {featuredGroups.length === 0 ? (
                    <div className="text-center py-10">
                        <p>No featured groups available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredGroups.map(group => (
                            <motion.div
                                key={group._id}
                                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <figure className="h-48 bg-slate-600 relative overflow-hidden">
                                    {group.imageUrl ? (
                                        <img
                                            src={group.imageUrl}
                                            alt={group.groupName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src={HobbyCard} />
                                    )}
                                </figure>
                                <div className="card-body p-6">
                                    <h3 className="card-title text-xl font-bold mb-2">{group.groupName}</h3>
                                    <p className="mb-4 text-base-content/80">
                                        {group.description?.length > 100
                                            ? group.description.substring(0, 100) + '...'
                                            : group.description}
                                    </p>
                                    <div className='flex justify-between items-center'>
                                        <div className="flex items-center">
                                            <FaUsers className="text-base-content/60 mr-2" size={18} />
                                            <span className="text-sm text-base-content/60">
                                                {group.maxMembers || 0} members
                                            </span>
                                        </div>
                                        <div className="card-actions">
                                            <Link to={`/groups/${group._id}`} className="font-medium cursor-pointer hover:scale-105 transition-all duration-200">
                                                View Group
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <Link to="/groups">
                        <Button variant="primary" size='lg'>View All Groups</Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturedGroups;