
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LineChart, Layers, User, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppNavigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-blue-600">Escentual Value</span>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")}`}
              >
                Home
              </Link>
              <Link
                to="/value-metrics"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/value-metrics")}`}
              >
                Value Metrics
              </Link>
              <Link
                to="/value-comparison"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/value-comparison")}`}
              >
                Compare
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
                Docs
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
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
            <Link
              to="/value-metrics"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/value-metrics")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LineChart className="mr-3 h-5 w-5" />
              Value Metrics
            </Link>
            <Link
              to="/value-comparison"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/value-comparison")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Layers className="mr-3 h-5 w-5" />
              Compare Products
            </Link>
            <Link
              to="/my-replenishments"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/my-replenishments")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="mr-3 h-5 w-5" />
              My Replenishments
            </Link>
            <Link
              to="/documentation"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/documentation")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Documentation
            </Link>
            <Link
              to="/settings"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive("/settings")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavigation;
