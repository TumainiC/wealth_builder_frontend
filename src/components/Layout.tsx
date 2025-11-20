import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, TrendingUp, User, LogOut, Home, Menu, X, ChevronRight } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Learning', path: '/learning', icon: BookOpen },
        { name: 'Investments', path: '/investments', icon: TrendingUp },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-gray-900 border-r border-purple-500/20
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <Link to="/dashboard" className="flex items-center space-x-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                </div>
                                <span className="font-bold text-xl gradient-text">Wealth Builder</span>
                            </Link>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        group flex items-center justify-between px-4 py-3 rounded-xl transition-all
                                        ${active
                                            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} className={active ? 'text-purple-400' : ''} />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    {active && <ChevronRight size={18} className="text-purple-400" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-purple-500/20 space-y-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar (Mobile) */}
                <nav className="glass-vibrant border-b border-purple-500/20 lg:hidden">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">

                            </div>
                            <span className="font-bold gradient-text">Wealth Builder</span>
                        </Link>
                        <div className="w-6"></div> {/* Spacer for centering */}
                    </div>
                </nav>

                {/* Desktop Top Bar */}
                <div className="hidden lg:block glass-vibrant border-b border-purple-500/20">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400">
                                Welcome back! 👋
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-950 border-t border-gray-800 py-6 px-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
                </footer>
            </div>
        </div>
    );
};
