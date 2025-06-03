import React, { useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaInfoCircle, FaUserCircle, FaUserPlus, FaTimesCircle } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import Button from '../ui/Button';
import showAlert from '../ui/Alert';

const GroupDetails = () => {
    const group = useLoaderData();
    const { groupName, category, description, location, maxMembers, startDate, imageUrl, createdBy, creatorEmail } = group;
    const { user } = useContext(AuthContext);
    const [hasJoined, setHasJoined] = useState(false);

    const formattedDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
    const isCreator = user && (user.email === creatorEmail || user.displayName === createdBy);

    const isExpired = startDate && new Date(startDate) < new Date(new Date().toDateString());

    const handleGroupAction = () => {
        if (hasJoined) {
            showAlert({
                title: 'Left Group',
                text: `You've left "${groupName}"`,
                icon: 'info',
                confirmButtonText: 'OK'
            });
            setHasJoined(false);
        } else {
            showAlert({
                title: 'Success!',
                text: `You've successfully joined "${groupName}"!`,
                icon: 'success',
                confirmButtonText: 'Great!'
            });
            setHasJoined(true);
        }
    };

    return (
        <motion.section
            className='bg-base-200'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-base-100 rounded-lg overflow-hidden shadow-md"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Group image section */}
                        <div className="flex flex-col md:flex-row">
                            <motion.div
                                className="md:w-[350px] h-[300px] md:h-auto bg-slate-700 flex items-center justify-center"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={groupName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-white opacity-70">
                                        Group Image
                                    </div>
                                )}
                            </motion.div>

                            {/* Group details header */}
                            <motion.div
                                className="p-6 md:flex-1"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{groupName}</h1>
                                <div className="flex items-center mb-2">
                                    <BiSolidCategory className="mr-2" />
                                    <span className='text-sm opacity-70'>{category}</span>
                                </div>

                                <div className="flex items-center mb-4">
                                    <MdLocationOn className="mr-2" />
                                    <span className='text-sm opacity-70'>{location}</span>
                                </div>

                                <p className="text-base-content/80 mb-6">
                                    {description}
                                </p>
                            </motion.div>
                        </div>

                        <div className="border-t border-base-300">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="space-y-4">
                                    {/* Start date */}
                                    <div className="flex items-center gap-4">
                                        <FaCalendarAlt size={20} />
                                        <div>
                                            <div className="font-medium">Start Date</div>
                                            <div>{formattedDate}</div>
                                        </div>
                                    </div>

                                    {/* Max members */}
                                    <div className="flex items-center gap-4">
                                        <FaUsers size={20} />
                                        <div>
                                            <div className="font-medium">Max Members</div>
                                            <div>{maxMembers}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Creator */}
                                    <div className="flex items-center gap-4">
                                        <FaUserCircle size={20} />
                                        <div>
                                            <div className="font-medium">Creator</div>
                                            <div className="mt-1">
                                                {createdBy}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description section */}
                            <div className="border-t border-base-300 p-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <div className="flex items-center mb-3">
                                        <FaInfoCircle className="mr-2" />
                                        <h3 className="text-lg font-medium">Description</h3>
                                    </div>
                                    <p className="text-base-content/80 whitespace-pre-line">
                                        {description}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Join/Cancel button */}
                        <motion.div
                            className="border-t border-base-300 p-6 flex justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {isCreator ? (
                                <div className="px-10 py-3 rounded bg-base-200 text-base-content font-semibold flex items-center gap-2">
                                    <FaUserCircle size={18} />
                                    You've created the group
                                </div>
                            ) : isExpired ? (
                                <div className="px-10 py-3 rounded bg-base-200 text-base-content font-semibold flex items-center gap-2">
                                    <FaTimesCircle size={18} />
                                    This group is no longer active
                                </div>
                            ) : (
                                <Button
                                    className={`px-10 py-3 flex items-center justify-center gap-2 ${hasJoined ? 'btn-error' : ''
                                        }`}
                                    onClick={handleGroupAction}
                                    size='lg'
                                    variant={hasJoined ? 'outline' : 'primary'}
                                >
                                    {hasJoined ? (
                                        <>
                                            <FaTimesCircle size={16} />
                                            Cancel Membership
                                        </>
                                    ) : (
                                        <>
                                            <FaUserPlus size={16} />
                                            Join Group
                                        </>
                                    )}
                                </Button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default GroupDetails;