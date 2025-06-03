import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaCamera, FaBook, FaHiking, FaUtensils, FaDice, FaPaintBrush } from 'react-icons/fa';

const PopularHobbies = () => {
    const hobbies = [
        {
            name: 'Photography',
            icon: <FaCamera className="text-2xl" />,
            link: '/groups?category=Photography'
        },
        {
            name: 'Reading',
            icon: <FaBook className="text-2xl" />,
            link: '/groups?category=Reading'
        },
        {
            name: 'Hiking',
            icon: <FaHiking className="text-2xl" />,
            link: '/groups?category=Hiking'
        },
        {
            name: 'Cooking',
            icon: <FaUtensils className="text-2xl" />,
            link: '/groups?category=Cooking'
        },
        {
            name: 'Board Games',
            icon: <FaDice className="text-2xl" />,
            link: '/groups?category=Board Games'
        },
        {
            name: 'Painting',
            icon: <FaPaintBrush className="text-2xl" />,
            link: '/groups?category=Painting'
        },
    ];

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
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Hobbies</h2>
                    <p className="text-lg opacity-80">Explore these trending interests and find your next passion</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {hobbies.map((hobby, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={hobby.link}
                                className="bg-base-100 rounded-lg shadow-sm p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center">
                                    {hobby.icon}
                                </div>
                                <span className="font-medium">{hobby.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default PopularHobbies;