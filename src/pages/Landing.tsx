import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, TrendingUp, Users, ArrowRight, CheckCircle, Sparkles, Zap, Shield, Award } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section with Vibrant Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 min-h-screen flex items-center">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-slide-in">
                            <Sparkles className="text-yellow-300" size={18} />
                            <span className="text-sm font-semibold text-white">Empowering Kenyan Entrepreneurs</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl tracking-tight font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl mb-6 animate-slide-in delay-100">
                            <span className="block mb-2">Build Wealth,</span>
                            <span className="block text-yellow-300">Not Just Budgets</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 max-w-3xl mx-auto text-xl text-white/90 sm:text-2xl leading-relaxed animate-slide-in delay-200">
                            Master <span className="font-bold text-yellow-300">financial skills</span>, discover investment opportunities, and transform your economic future—all in one platform.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-in delay-300">
                            <Link to="/register" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto group bg-white text-purple-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transform transition-all duration-200 btn-glow">
                                    Get Started Free
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={22} />
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white px-10 py-5 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-200"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/80 text-sm animate-slide-in delay-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span>Free Forever</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span>Expert-Created Content</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span>Kenyan-Focused</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                        <div className="w-1.5 h-2 bg-white rounded-full mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold gradient-text mb-4">Everything You Need to Succeed</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Comprehensive tools and resources designed for Kenyan entrepreneurs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-vibrant rounded-2xl p-8 hover-lift text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Learn Financial Skills</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Master budgeting, investing, and entrepreneurship with interactive courses tailored for Kenya
                            </p>
                        </div>

                        <div className="card-vibrant rounded-2xl p-8 hover-lift text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Discover Investments</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Find vetted micro-investment and P2P lending opportunities perfect for getting started
                            </p>
                        </div>

                        <div className="card-vibrant rounded-2xl p-8 hover-lift text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Award className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Track Your Progress</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Monitor your learning journey and celebrate achievements as you grow your wealth
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold gradient-text mb-2">12+</div>
                            <div className="text-lg text-gray-300">Expert-Created Modules</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold gradient-text-teal mb-2">100%</div>
                            <div className="text-lg text-gray-300">Free Access</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold gradient-text mb-2">3</div>
                            <div className="text-lg text-gray-300">Learning Paths</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card-vibrant rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <Zap className="text-yellow-400 w-16 h-16 mx-auto mb-6 animate-pulse-glow" />
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Ready to Build Your Wealth?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of Kenyans learning to grow their money and achieve financial freedom
                            </p>
                            <Link to="/register">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 text-xl font-bold rounded-2xl btn-glow group">
                                    Start Learning Today
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
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
            </div>
        </div>
    );
};
