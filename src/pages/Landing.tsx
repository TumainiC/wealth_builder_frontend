import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, TrendingUp, Users, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Hero Section with Gradient */}
            <div className="relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100 mb-8">
                            <Sparkles className="text-primary" size={16} />
                            <span className="text-sm font-medium text-gray-700">Empowering Kenyan Entrepreneurs</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl tracking-tight font-bold text-gray-900 sm:text-6xl md:text-7xl">
                            <span className="block mb-2">Build Wealth,</span>
                            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Not Just Budgets
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl leading-relaxed">
                            Empowering Kenyans with <span className="font-semibold text-gray-900">practical financial knowledge</span> and accessible investment opportunities. Learn how to start a business, invest in stocks, and grow your money.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/register" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                                    Get Started Free
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-emerald-600" size={18} />
                                <span>Free to Start</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-emerald-600" size={18} />
                                <span>12+ Learning Modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-emerald-600" size={18} />
                                <span>Kenyan-Focused Content</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section with Cards */}
            <div className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase mb-2">Your Journey</h2>
                        <p className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            A Complete Path to <span className="text-emerald-600">Financial Freedom</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Learn Card */}
                        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Master the basics of business and investing with our easy-to-follow modules tailored for the Kenyan market.
                                </p>
                            </div>
                        </div>

                        {/* Grow Card */}
                        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Grow</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Apply what you learn to start your own side hustle or improve your existing small business.
                                </p>
                            </div>
                        </div>

                        {/* Invest Card */}
                        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform">
                                    <Users size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Invest</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Connect with vetted local businesses looking for capital and earn returns through P2P lending.
                                </p>
                                <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Proof Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        Trusted by Future Millionaires
                    </h2>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white flex items-center justify-center text-white font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                            "Wealth Builder Kenya helped me understand how to price my eggs correctly. I'm now making <span className="font-bold text-yellow-300">20% more profit!</span>"
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                                J
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-white">Jane M.</p>
                                <p className="text-emerald-100 text-sm">Small Business Owner, Nairobi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Start Your Wealth Journey?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Join thousands of Kenyans building their financial future today.
                    </p>
                    <Link to="/register">
                        <Button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                            Get Started Now - It's Free
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
