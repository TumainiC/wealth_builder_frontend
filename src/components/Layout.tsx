import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, TrendingUp, User, LogOut, Home } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/dashboard" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">W</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900">Wealth Builder</span>
                            </Link>

                            <div className="hidden md:flex space-x-6">
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                >
                                    <Home size={18} className="mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/learning"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                >
                                    <BookOpen size={18} className="mr-2" />
                                    Learning
                                </Link>
                                <Link
                                    to="/investments"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                >
                                    <TrendingUp size={18} className="mr-2" />
                                    Investments
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/profile"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                            >
                                <User size={18} className="mr-2" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                            >
                                <LogOut size={18} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-600">
                            © 2025 Wealth Builder Kenya. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link to="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <a href="mailto:support@wealthbuilderkenya.com" className="text-gray-600 hover:text-primary transition-colors">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
