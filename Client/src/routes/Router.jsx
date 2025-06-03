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
                path: '/createGroup',
                element: (
                    <PrivateRoute>
                        <CreateGroups />
                    </PrivateRoute>
                ),
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
                path: '/myGroups',
                element: (
                    <PrivateRoute>
                        <MyGroups />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <LoadingSpinner />,
                loader: () => fetch('https://hobby-hub-server.vercel.app/groups'),
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
                path: '*',
                element: <ErrorPage />
            }
        ],
    },
]);

export default router;