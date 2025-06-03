import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { HiUserGroup } from 'react-icons/hi';
import { FaPlus } from "react-icons/fa";
import Button from '../ui/Button';
import { AuthContext } from '../context/AuthContext';
import showAlert from '../ui/Alert';
import { useNavigate } from 'react-router';

const CreateGroups = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        groupName: '',
        category: '',
        description: '',
        location: '',
        maxMembers: '',
        startDate: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddGroup = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const groupData = Object.fromEntries(formData.entries());

        if (user) {
            groupData.createdBy = user.displayName || 'Anonymous';
            groupData.creatorEmail = user.email;
            groupData.creatorImg = user.photoURL || '';
        }

        showAlert({
            title: 'Creating Group',
            text: 'Please wait while we create your group...',
            icon: 'info',
            showConfirmButton: false,
            customClass: {
                popup: 'rounded-lg shadow-xl animate-pulse'
            }
        });

        fetch('https://hobby-hub-server.vercel.app/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create group');
                }
                return response.json();
            })
            .then(() => {
                showAlert({
                    title: 'Success!',
                    text: 'Your group has been created successfully.',
                    icon: 'success',
                    confirmButtonText: 'View My Groups',
                    showCancelButton: true,
                    cancelButtonText: 'Create Another',
                    onConfirm: () => {
                        navigate('/myGroups');
                    },
                    onCancel: () => {
                        form.reset();
                        setFormData({
                            groupName: '',
                            category: '',
                            description: '',
                            location: '',
                            maxMembers: '',
                            startDate: '',
                            imageUrl: ''
                        });
                    }
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                showAlert({
                    title: 'Error',
                    text: 'Failed to create the group. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <motion.div
            className="bg-base-200 py-16 px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="max-w-lg mx-auto bg-base-100 rounded-lg shadow-md p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mx-auto bg-base-200 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                        <HiUserGroup className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Create a New Group</h2>
                    <p className="text-base opacity-80">Start a community around your favorite hobby</p>
                </motion.div>

                <form onSubmit={handleAddGroup}>
                    <div className="mb-4">
                        <label htmlFor="groupName" className="block text-sm font-medium mb-1">
                            Group Name
                        </label>
                        <input
                            type="text"
                            name="groupName"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Enter group name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Hobby Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Drawing & Painting">Drawing & Painting</option>
                            <option value="Photography">Photography</option>
                            <option value="Video Gaming">Video Gaming</option>
                            <option value="Fishing">Fishing</option>
                            <option value="Running">Running</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Writing</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Describe your group and its activities"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium mb-1">
                            Meeting Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="e.g. Community Center, Park, Online"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="maxMembers" className="block text-sm font-medium mb-1">
                                Max Members
                            </label>
                            <input
                                type="number"
                                name="maxMembers"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="e.g. 20"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Paste a representative image URL"
                        />
                    </div>
                    {user && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    value={user.displayName || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-200 text-base-content opacity-80"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-200 text-base-content opacity-80"
                                />
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex items-center justify-center"
                    >
                        <FaPlus />
                        <span className="mr-2">Create</span>
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CreateGroups;