import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import showAlert from '../ui/Alert';

const UpdateModal = ({ isOpen, onClose, groupId, onSuccess, user }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        category: '',
        location: '',
        maxMembers: '',
        startDate: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (isOpen && groupId) {
            const fetchGroupData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`https://hobby-hub-server.vercel.app/groups/${groupId}`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch group data');
                    }

                    const data = await response.json();

                    const formattedDate = data.startDate
                        ? new Date(data.startDate).toISOString().split('T')[0]
                        : '';

                    setFormData({
                        groupName: data.groupName || '',
                        description: data.description || '',
                        category: data.category || '',
                        location: data.location || '',
                        maxMembers: data.maxMembers || '',
                        startDate: formattedDate,
                        imageUrl: data.imageUrl || ''
                    });
                } catch (err) {
                    console.error('Error fetching group:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchGroupData();
        }
    }, [isOpen, groupId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://hobby-hub-server.vercel.app/groups/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update group');
            }

            const updatedGroup = await response.json();

            showAlert({
                title: 'Success!',
                text: 'Group updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            if (onSuccess) {
                onSuccess(updatedGroup);
            }

            onClose();
        } catch (err) {
            console.error('Error updating group:', err);
            toast.error('Failed to update group: ' + err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-base-200">
                    <h3 className="text-xl font-bold">Update Group</h3>
                    <button
                        onClick={onClose}
                        className="text-xl font-semibold hover:opacity-70 cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

                {loading ? (
                    <div className="p-6 text-center">Loading group data...</div>
                ) : error ? (
                    <div className="p-6 text-center text-red-500">Error: {error}</div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Group Name</label>
                                <input
                                    type="text"
                                    name="groupName"
                                    value={formData.groupName}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                    required
                                >
                                    <option value="">Select a category</option>
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

                            <div>
                                <label className="block mb-2 font-medium">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Maximum Members</label>
                                <input
                                    type="number"
                                    name="maxMembers"
                                    value={formData.maxMembers}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Image URL (optional)</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-base-300 rounded-md focus:outline-none focus:border-primary min-h-[120px]"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    User Name
                                </label>
                                <input type="text" value={user.displayName || ''} disabled className='w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-200 text-base-content opacity-80' />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    Email
                                </label>
                                <input type="text" value={user.email || ''} disabled className='w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-200 text-base-content opacity-80' />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                            >
                                Update Group
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateModal;