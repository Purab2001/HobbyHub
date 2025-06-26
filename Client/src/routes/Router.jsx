import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorPage from '../pages/ErrorPage';
import AllGroups from '../pages/AllGroups';
import CreateGroups from '../pages/CreateGroups';
import Login from '../pages/Login';
import Register from '../pages/Register';
import GroupDetails from '../pages/GroupDetails';
import MyGroups from '../pages/MyGroups';
import PrivateRoute from '../context/PrivateRoute';
import AboutUs from '../pages/AboutUs';
import Terms from '../pages/Terms';
import DashboardLayout from '../layouts/DashboardLayout';
// Dashboard pages
import DashboardHome from '../pages/Dashboard/DashboardHome';
import UpdateProfile from '../pages/Dashboard/UpdateProfile';
import AllGroups2 from '../pages/Dashboard/AllGroups2';

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <MainLayout />,
        children: [
            {
                index: true,
                hydrateFallbackElement: <LoadingSpinner />,
                loader: () => fetch('https://hobby-hub-server.vercel.app/groups'),
                Component: Home,
            },
            {
                path: '/groups',
                hydrateFallbackElement: <LoadingSpinner />,
                loader: () => fetch('https://hobby-hub-server.vercel.app/groups'),
                Component: AllGroups,
            },
            {
                path: '/groups/:id',
                element: (
                    <PrivateRoute>
                        <GroupDetails />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <LoadingSpinner />,
                loader: ({ params }) => fetch(`https://hobby-hub-server.vercel.app/groups/${params.id}`),
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/about',
                Component: AboutUs
            },
            {
                path: '/terms',
                Component: Terms
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'all-groups',
                Component: AllGroups2,
            },
            {
                path: 'create-groups',
                Component: CreateGroups,
            },
            {
                path: 'my-groups',
                Component: MyGroups,
            },
            {
                path: 'update-profile',
                Component: UpdateProfile,
            },
        ]
    }
]);

export default router;