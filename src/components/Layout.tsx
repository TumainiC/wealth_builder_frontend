import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, TrendingUp, User, LogOut, Home, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        <div className="min-h-screen bg-white flex">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                ${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100
                transform transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <Link to="/dashboard" className={`flex items-center space-x-3 group ${isCollapsed ? 'justify-center' : ''}`}>
                                <div className="w-10 h-10 bg-electric-blue rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">W</span>
                                </div>
                                {!isCollapsed && <span className="font-bold text-lg text-black">Wealth Builder</span>}
                            </Link>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="hidden lg:block text-grey hover:text-black transition-colors p-1 rounded-lg hover:bg-gray-100"
                                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                >
                                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                                </button>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden text-grey hover:text-black transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`${active ? 'sidebar-item-active' : 'sidebar-item'} ${isCollapsed ? 'justify-center' : ''}`}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <Icon size={20} strokeWidth={1.5} className="flex-shrink-0" />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className={`sidebar-item w-full text-red-500 hover:bg-red-50 ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? 'Logout' : ''}
                        >
                            <LogOut size={20} strokeWidth={1.5} className="flex-shrink-0" />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar (Mobile) */}
                <nav className="bg-white border-b border-gray-100 lg:hidden">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-black hover:text-electric-blue transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-electric-blue rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">W</span>
                            </div>
                            <span className="font-bold text-black">Wealth Builder</span>
                        </Link>
                        <div className="w-6"></div> {/* Spacer for centering */}
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-light-grey">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-4 px-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
                        <p className="text-grey">
                            © 2025 Wealth Builder Kenya
                        </p>
                        <div className="flex gap-6">
                            <Link to="/terms" className="text-grey hover:text-electric-blue transition-colors">
                                Terms
                            </Link>
                            <Link to="/privacy-policy" className="text-grey hover:text-electric-blue transition-colors">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
