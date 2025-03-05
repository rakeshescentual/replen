
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100";
  };

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-blue-600">Replenish Reminder</span>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")}`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dashboard")}`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-replenishments"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/my-replenishments")}`}
              >
                My Replenishments
              </Link>
              <Link
                to="/documentation"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/documentation")}`}
              >
                Documentation
              </Link>
              <Link
                to="/settings"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/settings")}`}
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;
