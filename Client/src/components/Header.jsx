import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import TypewriterEffect from '../ui/TypewriterEffect';
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.jpg';
import slider3 from '../assets/slider3.jpg';

const Header = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === 3 ? 1 : prev + 1));
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (slideNumber) => {
        setActiveSlide(slideNumber);
    };

    const slideContent = [
        {
            title: "Discover Local Hobbies",
            description: "Find groups of people who share your interests and passions in your local area.",
            buttonText: "Explore Groups",
            buttonLink: "/groups"
        },
        {
            title: "Connect With Enthusiasts",
            description: "Join communities of like-minded individuals who share your passion.",
            buttonText: "Browse Communities",
            buttonLink: "/groups"
        },
        {
            title: "Share Your Passions",
            description: "Create your own groups and invite others to participate in your favorite activities.",
            buttonText: "Create a Group",
            buttonLink: "/createGroup"
        }
    ];

    return (
        <motion.div
            className="relative w-full h-[650px] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            {[1, 2, 3].map((slideNumber) => (
                <div
                    key={slideNumber}
                    className={`absolute w-full h-full transition-opacity duration-500 ${activeSlide === slideNumber ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <img
                        src={slideNumber === 1 ? slider1 : slideNumber === 2 ? slider2 : slider3}
                        className="w-full h-full object-cover"
                        alt={`Slide ${slideNumber}`}
                    />
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="absolute inset-0 flex items-center">
                        <div className="px-6 md:px-12 lg:px-24 container mx-auto">
                            <div className="max-w-xl">
                                {activeSlide === slideNumber && (
                                    <TypewriterEffect
                                        key={`typewriter-${slideNumber}`}
                                        text={slideContent[slideNumber - 1].title}
                                    />
                                )}
                                <p className="text-lg md:text-xl mb-8 text-white">
                                    {slideContent[slideNumber - 1].description}
                                </p>
                                <Link to={slideContent[slideNumber - 1].buttonLink}>
                                    <button className="btn bg-white hover:bg-gray-100 text-slate-800 border-none shadow-none p-6 font-medium rounded-md text-lg">
                                        {slideContent[slideNumber - 1].buttonText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {[1, 2, 3].map((slideNumber) => (
                    <button
                        key={slideNumber}
                        onClick={() => goToSlide(slideNumber)}
                        className={`w-3 h-3 rounded-full transition-colors ${activeSlide === slideNumber ? "bg-white" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${slideNumber}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Header;