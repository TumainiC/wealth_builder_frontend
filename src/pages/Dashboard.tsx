import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, ArrowRight, Award, Target, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back! 👋</h1>
                            <p className="text-emerald-100 text-lg">Let's continue your journey to financial freedom.</p>
                        </div>
                        <Link to="/learning">
                            <Button className="group bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Continue Learning
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Current Level Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-1">Current Level</p>
                                    <h3 className="text-3xl font-bold capitalize">{user?.literacyLevel}</h3>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <BookOpen size={24} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                    <div className="bg-white rounded-full h-2 transition-all duration-500" style={{ width: '30%' }}></div>
                                </div>
                                <p className="text-sm text-emerald-100">30% Complete</p>
                            </div>
                        </div>
                    </Card>

                    {/* Primary Goal Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-1">Primary Goal</p>
                                    <h3 className="text-2xl font-bold capitalize">{user?.primaryGoal?.replace(/_/g, ' ')}</h3>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <Target size={24} />
                                </div>
                            </div>
                            <p className="text-blue-100 text-sm mt-4">Stay focused on your financial goals</p>
                        </div>
                    </Card>

                    {/* Achievements Card */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium mb-1">Achievements</p>
                                    <h3 className="text-3xl font-bold">0</h3>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <Award size={24} />
                                </div>
                            </div>
                            <p className="text-purple-100 text-sm mt-4">Complete modules to earn badges</p>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Next Lesson Card */}
                    <Card className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Next Lesson</h3>
                                <p className="text-gray-600">Starting a Small Business</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <BookOpen className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">Learn the fundamentals of starting your own business in Kenya</p>
                        <Link to="/learning">
                            <Button className="w-full group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg">
                                Start Learning
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </Link>
                    </Card>

                    {/* Explore Investments Card */}
                    <Card className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Explore Investments</h3>
                                <p className="text-gray-600">Browse local opportunities</p>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-xl">
                                <TrendingUp className="text-emerald-600" size={24} />
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">Discover vetted businesses looking for investors</p>
                        <Link to="/investments">
                            <Button variant="outline" className="w-full group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                View Opportunities
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Tips Section */}
                <Card className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-yellow-400 p-3 rounded-xl flex-shrink-0">
                            <Zap className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Quick Tip</h3>
                            <p className="text-gray-700">
                                Complete at least one module per week to build consistent financial knowledge. Small steps lead to big results!
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
