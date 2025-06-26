import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaPlus, FaLayerGroup, FaUsers, FaClock } from 'react-icons/fa';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('https://hobby-hub-server.vercel.app/groups');
                const data = await res.json();
                setGroups(data);
                // Simulate recent activity (replace with real activity if available)
                setRecentActivities(
                    data
                        .filter(g => g.creatorEmail === user?.email)
                        .slice(-5)
                        .map(g => ({
                            type: 'Created Group',
                            groupName: g.groupName,
                            date: g.startDate,
                        }))
                );
            } catch {
                setGroups([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, [user]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>;
    }

    const userGroups = groups.filter(g => g.creatorEmail === user?.email);
    const activeGroups = userGroups.filter(g => new Date(g.startDate) >= new Date());
    const totalMembers = userGroups.reduce((sum, g) => sum + (parseInt(g.maxMembers) || 0), 0);

    const stats = [
        { title: 'Groups Created', value: userGroups.length, icon: <FaPlus /> },
        { title: 'Active Groups', value: activeGroups.length, icon: <FaLayerGroup /> },
        { title: 'Total Members', value: totalMembers, icon: <FaUsers /> },
        { title: 'Recent Activity', value: recentActivities.length, icon: <FaClock /> },
    ];

    return (
        <div className="p-6 md:p-10">
            <h1 className="text-2xl font-bold mb-6">Dashboard Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-base-100 rounded-lg shadow p-6 flex flex-col items-center">
                        <div className="text-3xl mb-2 text-primary">{stat.icon}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-base opacity-80">{stat.title}</div>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                {recentActivities.length === 0 ? (
                    <div className="opacity-60">No recent activity.</div>
                ) : (
                    <ul className="space-y-3">
                        {recentActivities.map((activity, idx) => (
                            <li key={idx} className="bg-base-100 rounded shadow p-4 flex items-center">
                                <span className="mr-3 text-lg text-primary"><FaPlus /></span>
                                <span>
                                    <span className="font-medium">{activity.type}</span> — <span>{activity.groupName}</span>
                                    <span className="ml-2 text-xs opacity-70">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;