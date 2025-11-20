import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, TrendingUp, User, LogOut, Home, Sparkles } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Navigation */}
            <nav className="glass-vibrant border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/dashboard" className="flex items-center space-x-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="text-white" size={20} />
                                </div>
                                <span className="font-bold text-xl gradient-text">Wealth Builder</span>
                            </Link>

                            <div className="hidden md:flex space-x-2">
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <Home size={18} className="mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/learning"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <BookOpen size={18} className="mr-2" />
                                    Learning
                                </Link>
                                <Link
                                    to="/investments"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <TrendingUp size={18} className="mr-2" />
                                    Investments
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Link
                                to="/profile"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <User size={18} className="mr-2" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                                <LogOut size={18} className="mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-950 border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 Wealth Builder Kenya. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link to="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
