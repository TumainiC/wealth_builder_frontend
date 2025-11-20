import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, ArrowRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                    <p className="text-gray-600">Let's continue your journey to financial freedom.</p>
                </div>
                <Link to="/learning">
                    <Button>Continue Learning</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-green-100 mb-1">Current Level</p>
                            <h3 className="text-2xl font-bold capitalize">{user?.literacyLevel}</h3>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <BookOpen className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-black/20 rounded-full h-2">
                            <div className="bg-white rounded-full h-2" style={{ width: '30%' }}></div>
                        </div>
                        <p className="text-sm mt-2 text-green-100">30% Complete</p>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-gray-900">Next Lesson</h3>
                            <p className="text-sm text-gray-500">Starting a Small Business</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <BookOpen className="text-blue-600" size={20} />
                        </div>
                    </div>
                    <h4 className="font-medium mb-4">Module 1: Identifying Opportunities</h4>
                    <Link to="/learning/module/1">
                        <Button variant="outline" className="w-full text-sm">Start Lesson</Button>
                    </Link>
                </Card>

                <Card>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-gray-900">Investment Preview</h3>
                            <p className="text-sm text-gray-500">P2P Marketplace</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg">
                            <TrendingUp className="text-orange-600" size={20} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Explore local business investment opportunities.
                    </p>
                    <Link to="/investments">
                        <Button variant="secondary" className="w-full text-sm">Browse Listings</Button>
                    </Link>
                </Card>
            </div>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recommended Paths</h2>
                    <Link to="/learning" className="text-primary text-sm font-medium hover:underline flex items-center">
                        View All <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Placeholder for learning paths */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-green-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Starting a Small Business</h3>
                        <p className="text-sm text-gray-600 mb-4">Learn the fundamentals of entrepreneurship, from idea to execution.</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">4 Modules</span>
                            <span>Beginner</span>
                        </div>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-green-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Investing in Stocks</h3>
                        <p className="text-sm text-gray-600 mb-4">Understand the Nairobi Securities Exchange and how to buy shares.</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">4 Modules</span>
                            <span>Intermediate</span>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};
