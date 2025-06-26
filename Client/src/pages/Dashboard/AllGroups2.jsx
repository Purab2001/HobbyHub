import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Button from '../../ui/Button';

const AllGroups2 = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState(['All Categories']);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const uniqueCategories = [
          'All Categories',
          ...Array.from(new Set(data.map(group => group.category || 'Other')))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter(group => {
    const matchesCategory =
      selectedCategory === 'All Categories' || group.category === selectedCategory;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      group.groupName?.toLowerCase().includes(lowerSearch) ||
      (group.category || '').toLowerCase().includes(lowerSearch) ||
      group.description?.toLowerCase().includes(lowerSearch);
    return matchesCategory && matchesSearch;
  });

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
      <motion.div
        className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-6 text-center sm:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">All Groups ({groups.length})</h1>
          <p className="opacity-80">Browse and explore all available groups</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col md:flex-row gap-4 w-full md:w-auto md:justify-end">
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
      </motion.div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-lg shadow-sm">
          <p className="mb-4">No groups found.</p>
        </div>
      ) : (
        <motion.div
          className="overflow-x-visible overflow-y-visible"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
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
              {filteredGroups.map((group, idx) => (
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
                    <Link to={`/groups/${group._id}`}>
                      <Button className="flex items-center gap-2 btn-sm btn-outline shadow-none">
                        <FaEye />
                      </Button>
                    </Link>
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

export default AllGroups2;