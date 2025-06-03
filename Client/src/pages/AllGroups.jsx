import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import Button from '../ui/Button';
import { useLocation, Link } from 'react-router';
import LoadingSpinner from '../ui/LoadingSpinner';
import HobbyCard from '../assets/HobbyCard.jpg';

const PAGE_SIZE = 8;

const AllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState(['All Categories']);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://hobby-hub-server.vercel.app/groups');

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const data = await response.json();
                setGroups(data);

                const uniqueCategories = ['All Categories',
                    ...Array.from(new Set(data.map(group => group.category || 'Other')))
                ];
                setCategories(uniqueCategories);

            } catch (err) {
                console.error('Error fetching groups:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam && categories.includes(categoryParam)) {
            setSelectedCategory(categoryParam);
            setCurrentPage(1);
        }
    }, [location.search, categories]);

    const filteredGroups = groups.filter(group => {
        const matchesCategory = selectedCategory === 'All Categories' || group.category === selectedCategory;
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            group.groupName?.toLowerCase().includes(lowerSearch) ||
            (group.category || '').toLowerCase().includes(lowerSearch) ||
            group.description?.toLowerCase().includes(lowerSearch);
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredGroups.length / PAGE_SIZE);
    const paginatedGroups = filteredGroups.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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
            <div className="container mx-auto py-16 px-6">
                <div className="text-center text-red-500">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p>{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-primary text-white rounded"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.section
            className='bg-base-200'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className=" px-6 md:px-12 lg:px-24 py-16 container mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col lg:flex-row md:items-center lg:justify-between gap-6">
                        <div className="flex-1 min-w-0 text-center lg:text-left">
                            <h1 className="text-3xl font-bold mb-1">All Hobby Groups</h1>
                            <p className="opacity-80 mb-0 md:mb-0">
                                Browse and explore all available groups. Find your next hobby community!
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto md:justify-end">
                            <div className="relative md:w-64 lg:w-80 w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <FiSearch className="h-5 w-5" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search groups..."
                                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="relative md:w-56 w-full">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {groups.length === 0 && !loading && (
                    <div className="container mx-auto text-center py-10">
                        <p className="text-lg">No groups available at the moment.</p>
                    </div>
                )}

                {groups.length > 0 && filteredGroups.length === 0 && (
                    <div className="container mx-auto text-center py-10">
                        <p className="text-lg">No groups match your search criteria.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All Categories');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Groups Grid */}
                {filteredGroups.length > 0 && (
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                        {paginatedGroups.map((group, idx) => (
                            <motion.div
                                key={group._id}
                                className="card bg-base-100 shadow-sm w-full"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <figure className="h-48 bg-base-300 relative overflow-hidden">
                                    {group.imageUrl ? (
                                        <img
                                            src={group.imageUrl}
                                            alt={group.groupName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={HobbyCard}
                                            alt="Default hobby image"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </figure>
                                <div className="card-body">
                                    <span className="inline-block bg-base-300 text-xs px-2 py-1 rounded mb-2 self-start">
                                        {group.category || 'Other'}
                                    </span>
                                    <h2 className="card-title">{group.groupName}</h2>
                                    <p className="opacity-80 text-sm flex-1">
                                        {group.description?.length > 100
                                            ? group.description.substring(0, 100) + '...'
                                            : group.description}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/groups/${group._id}`}>
                                            <Button variant="outline" size='md'>See More</Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {filteredGroups.length > 0 && totalPages > 1 && (
                    <div className="container mx-auto flex justify-center mt-10">
                        <nav className="flex space-x-2">
                            <button
                                className="w-8 h-8 rounded bg-white border border-gray-300 text-gray-500 cursor-pointer"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >&lt;</button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-gray-900 text-white font-bold cursor-pointer' : 'bg-white border border-gray-300 text-gray-500 cursor-pointer'}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="w-8 h-8 rounded bg-white border border-gray-300 text-gray-500 cursor-pointer"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >&gt;</button>
                        </nav>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default AllGroups;