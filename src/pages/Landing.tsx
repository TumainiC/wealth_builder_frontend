import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, ArrowRight, CheckCircle, Target, Rocket } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-blue border border-electric-blue/20 rounded-full mb-6">
                            <span className="text-sm font-semibold text-electric-blue">🌟 Empowering Kenyan Entrepreneurs</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl tracking-tight font-bold text-black sm:text-6xl md:text-7xl mb-6">
                            <span className="block mb-2">Build Wealth,</span>
                            <span className="block text-electric-blue">Not Just Budgets</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 max-w-3xl mx-auto text-xl text-grey sm:text-2xl leading-relaxed">
                            Master <span className="font-bold text-electric-blue">financial skills</span>, discover investment opportunities, and transform your economic future—all in one platform.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/register" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto btn-pill-primary group px-10 py-4 text-lg">
                                    Get Started Free
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" size={20} />
                                </button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto btn-pill-secondary px-10 py-4 text-lg">
                                    Sign In
                                </button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8 text-grey text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-electric-blue" />
                                <span>Free Forever</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-electric-blue" />
                                <span>Expert-Created Content</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-electric-blue" />
                                <span>Kenyan-Focused</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-light-grey">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">Everything You Need to Succeed</h2>
                        <p className="text-xl text-grey max-w-2xl mx-auto">
                            Comprehensive tools and resources designed for Kenyan entrepreneurs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-white text-center">
                            <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-3">Learn Financial Skills</h3>
                            <p className="text-grey leading-relaxed">
                                Master budgeting, investing, and entrepreneurship with interactive courses tailored for Kenya
                            </p>
                        </div>

                        <div className="card-white text-center">
                            <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-3">Discover Investments</h3>
                            <p className="text-grey leading-relaxed">
                                Find vetted micro-investment and P2P lending opportunities perfect for getting started
                            </p>
                        </div>

                        <div className="card-white text-center">
                            <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-3">Track Your Progress</h3>
                            <p className="text-grey leading-relaxed">
                                Monitor your learning journey and celebrate achievements as you grow your wealth
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-electric-blue mb-2">12+</div>
                            <div className="text-lg text-grey">Expert-Created Modules</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-electric-blue mb-2">100%</div>
                            <div className="text-lg text-grey">Free Access</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-electric-blue mb-2">3</div>
                            <div className="text-lg text-grey">Learning Paths</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Paths Preview */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-light-grey">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">Choose Your Learning Path</h2>
                        <p className="text-xl text-grey max-w-2xl mx-auto">
                            Start with the path that matches your experience level
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <Target className="text-electric-blue" size={24} />
                                </div>
                                <span className="badge-blue">Beginner</span>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Starting a Small Business</h3>
                            <p className="text-grey text-sm mb-4">
                                Learn how to identify opportunities and grow your customer base
                            </p>
                            <div className="text-sm text-grey">4 modules</div>
                        </div>

                        <div className="card-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <TrendingUp className="text-electric-blue" size={24} />
                                </div>
                                <span className="badge-blue">Intermediate</span>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Investing in Stocks (NSE)</h3>
                            <p className="text-grey text-sm mb-4">
                                Understand the stock market and buy your first share
                            </p>
                            <div className="text-sm text-grey">4 modules</div>
                        </div>

                        <div className="card-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <Rocket className="text-electric-blue" size={24} />
                                </div>
                                <span className="badge-blue">Advanced</span>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">P2P Lending & Angel Investing</h3>
                            <p className="text-grey text-sm mb-4">
                                Build an investment portfolio with advanced strategies
                            </p>
                            <div className="text-sm text-grey">4 modules</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card-white bg-light-blue border-2 border-electric-blue/20 p-12">
                        <Award className="text-electric-blue w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Ready to Build Your Wealth?
                        </h2>
                        <p className="text-xl text-grey mb-8 max-w-2xl mx-auto">
                            Join thousands of Kenyans learning to grow their money and achieve financial freedom
                        </p>
                        <Link to="/register">
                            <button className="btn-pill-primary px-12 py-5 text-xl group">
                                Start Learning Today
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" size={24} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-grey text-sm">
                        © 2025 Wealth Builder Kenya. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link to="/terms" className="text-grey hover:text-electric-blue transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link to="/privacy-policy" className="text-grey hover:text-electric-blue transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
