import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Comments = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Photography Group Member",
            image: "https://i.pravatar.cc/100?img=1",
            comment: "I've always loved photography but never had anyone to share it with. Since joining the Urban Photography group, I've made amazing friends and improved my skills tremendously."
        },
        {
            name: "Michael Chen",
            role: "Board Game Group Captain",
            image: "https://i.pravatar.cc/100?img=3",
            comment: "Creating my board game group was the best decision I've made. We started with just 4 people and now we're a thriving community of over 30 members who meet every week!"
        },
        {
            name: "Emily Rodriguez",
            role: "Hiking Group Member",
            image: "https://i.pravatar.cc/100?img=5",
            comment: "I was new to the city and wanted to explore while meeting new people. The Weekend Hikers group welcomed me with open arms and now I have both adventure buddies and lifelong friends."
        }
    ];

    return (
        <motion.section
            className="py-16 bg-base-100 container mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="px-6 md:px-12 lg:px-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">What Our Members Say</h2>
                    <p className="text-lg opacity-80">Hear from people who found their community through HobbyHub</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-base-200 p-6 rounded-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm opacity-80">{item.role}</p>
                                </div>
                            </div>
                            <p className="italic opacity-90">"{item.comment}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Comments;