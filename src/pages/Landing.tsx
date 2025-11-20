import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, TrendingUp, Users } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Build Wealth,</span>
                            <span className="block text-primary">Not Just Budgets</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Empowering Kenyans with practical financial knowledge and accessible investment opportunities. Learn how to start a business, invest in stocks, and grow your money.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link to="/register">
                                    <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link to="/login">
                                    <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10">
                                        Log In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Value Proposition Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Mission</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A Complete Path to Financial Freedom
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <BookOpen size={24} />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Learn</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Master the basics of business and investing with our easy-to-follow modules tailored for the Kenyan market.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <TrendingUp size={24} />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Grow</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Apply what you learn to start your own side hustle or improve your existing small business.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <Users size={24} />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Invest</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Connect with vetted local businesses looking for capital and earn returns through P2P lending (Coming Soon).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Proof Placeholder */}
            <div className="bg-gray-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Trusted by Future Millionaires</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            "Wealth Builder Kenya helped me understand how to price my eggs correctly. I'm now making 20% more profit!"
                        </p>
                        <p className="mt-2 font-medium text-gray-900">- Jane M., Nairobi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
