import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { FaHome, FaPlus, FaLayerGroup, FaUserEdit, FaThList } from 'react-icons/fa'
import logo from '/logo.svg'

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          {/* Sidebar content here */}
          <div className="w-10 h-10 mb-8 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="HobbyHub" className="w-10 h-10" />
              <span className="ml-2 font-bold text-lg">HobbyHub</span>
            </Link>
          </div>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'active bg-black text-white font-bold'
                  : undefined
              }
              end
            >
              <FaHome className="inline mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-groups"
              className={({ isActive }) =>
                isActive
                  ? 'active bg-black text-white font-bold'
                  : undefined
              }
            >
              <FaThList className="inline mr-2" />
              All Groups
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-groups"
              className={({ isActive }) =>
                isActive
                  ? 'active bg-black text-white font-bold'
                  : undefined
              }
            >
              <FaPlus className="inline mr-2" />
              Create Groups
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-groups"
              className={({ isActive }) =>
                isActive
                  ? 'active bg-black text-white font-bold'
                  : undefined
              }
            >
              <FaLayerGroup className="inline mr-2" />
              My Groups
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/update-profile"
              className={({ isActive }) =>
                isActive
                  ? 'active bg-black text-white font-bold'
                  : undefined
              }
            >
              <FaUserEdit className="inline mr-2" />
              Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DashboardLayout