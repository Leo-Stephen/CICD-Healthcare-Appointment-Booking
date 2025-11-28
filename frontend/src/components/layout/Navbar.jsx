import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'PATIENT':
        return '/patient/dashboard';
      case 'DOCTOR':
        return '/doctor/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-medical-600 to-medical-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-gradient">HealthCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
                  Dashboard
                </Link>
                <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                  </div>
                  <button onClick={logout} className="btn btn-secondary text-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="block py-2">Dashboard</Link>
                <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                <button onClick={logout} className="btn btn-secondary w-full">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2">Login</Link>
                <Link to="/register" className="btn btn-primary w-full">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
