import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import showAlert from '../ui/Alert';
import UpdateModal from '../components/UpdateModal';

const MyGroups = () => {
    const [myGroups, setMyGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        const fetchMyGroups = async () => {
            try {
                const response = await fetch('https://hobby-hub-server.vercel.app/groups');

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const allGroups = await response.json();
                const userGroups = allGroups.filter(group => group.creatorEmail === user.email);

                setMyGroups(userGroups);
            } catch (err) {
                console.error('Error fetching groups:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyGroups();
        }
    }, [user]);

    const handleDelete = async (groupId, groupName) => {
        showAlert({
            title: 'Delete Group',
            text: `Are you sure you want to delete "${groupName}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    const response = await fetch(`https://hobby-hub-server.vercel.app/groups/${groupId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete group');
                    }

                    setMyGroups(myGroups.filter(group => group._id !== groupId));
                    toast.success('Group deleted successfully!');
                } catch (err) {
                    console.error('Error deleting group:', err);
                    toast.error('Failed to delete group');
                }
            }
        });
    };

    const handleUpdate = (groupId) => {
        setSelectedGroupId(groupId);
        setModalOpen(true);
    };

    const handleUpdateSuccess = (updatedGroup) => {
        console.log('Updated group received:', updatedGroup);

        const fetchUpdatedGroups = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://hobby-hub-server.vercel.app/groups');

                if (!response.ok) {
                    throw new Error('Failed to fetch updated groups');
                }

                const allGroups = await response.json();
                const userGroups = allGroups.filter(group => group.creatorEmail === user.email);

                setMyGroups(userGroups);
                toast.success('Group updated successfully!');
            } catch (err) {
                console.error('Error refreshing groups:', err);

                setMyGroups(myGroups.map(group =>
                    group._id === updatedGroup._id ? { ...group, ...updatedGroup } : group
                ));

                toast.success('Group updated successfully, but some data may not be refreshed.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUpdatedGroups();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-10 text-red-500">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto min-h-[calc(100vh-65px)] px-6 md:px-12 lg:px-24 py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            {/* Update Modal */}
            <UpdateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                groupId={selectedGroupId}
                onSuccess={handleUpdateSuccess}
                user={user}
            />

            <motion.div
                className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-6 text-center sm:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Groups</h1>
                    <p className="opacity-80">Manage all the groups you have created</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link to="/createGroup">
                        <Button className="flex items-center gap-2">
                            <FaPlus /> Create New Group
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {myGroups.length === 0 ? (
                <div className="text-center py-10 bg-base-100 rounded-lg shadow-sm">
                    <p className="mb-4">You haven't created any groups yet.</p>
                    <Link to="/createGroup">
                        <Button variant="primary">Create Your First Group</Button>
                    </Link>
                </div>
            ) : (
                <motion.div
                    className="overflow-x-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <table className="w-full table-auto border-collapse bg-base-100 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-base-200 text-left">
                                <th className="px-4 py-3 font-medium">GROUP NAME</th>
                                <th className="px-4 py-3 font-medium">HOBBY CATEGORY</th>
                                <th className="px-4 py-3 font-medium">MEETING LOCATION</th>
                                <th className="px-4 py-3 font-medium">MAX MEMBERS</th>
                                <th className="px-4 py-3 font-medium">START DATE</th>
                                <th className="px-4 py-3 font-medium">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myGroups.map((group, idx) => (
                                <motion.tr
                                    key={group._id}
                                    className="border-t border-base-200 hover:bg-base-200/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <td className="px-4 py-3">{group.groupName}</td>
                                    <td className="px-4 py-3">{group.category}</td>
                                    <td className="px-4 py-3">{group.location}</td>
                                    <td className="px-4 py-3">{group.maxMembers}</td>
                                    <td className="px-4 py-3">
                                        {new Date(group.startDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(group._id)}
                                                className="btn btn-sm btn-outline shadow-none"
                                            >
                                                <FaEdit /> Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(group._id, group.groupName)}
                                                className="btn btn-sm btn-outline btn-error shadow-none"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MyGroups;