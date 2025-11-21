import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, BookOpen, Target, Award, ArrowRight, Trophy, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserStats {
    completedModules: number;
    totalQuizzesTaken: number;
    averageScore: number;
    streakDays: number;
    overallProgress: number;
}

export const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/progress', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const userName = localStorage.getItem('userName') || 'Learner';

    return (
        <div className="min-h-screen bg-white">
            {/* Clean Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-black">
                                Welcome back, {userName}!
                            </h1>
                            <p className="text-grey mt-1">Continue your financial learning journey</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full">
                                <Flame className="text-gold" size={20} />
                                <span className="font-semibold text-black">
                                    {stats?.streakDays || 0} Day Streak
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-white h-40 animate-pulse bg-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="card-white">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <BookOpen className="text-electric-blue" size={24} />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-black mb-2">
                                {stats?.completedModules || 0}
                            </div>
                            <div className="text-grey font-medium">Modules Completed</div>
                        </div>

                        <div className="card-white">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <Target className="text-electric-blue" size={24} />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-black mb-2">
                                {stats?.totalQuizzesTaken || 0}
                            </div>
                            <div className="text-grey font-medium">Quizzes Taken</div>
                        </div>

                        <div className="card-white">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-full bg-electric-blue/10">
                                    <Award className="text-electric-blue" size={24} />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-black mb-2">
                                {stats?.averageScore || 0}%
                            </div>
                            <div className="text-grey font-medium">Average Score</div>
                        </div>
                    </div>
                )}

                {/* Conditional Content based on user progress */}
                {stats && (stats.completedModules > 0 || stats.overallProgress > 0) ? (
                    <>
                        {/* Active User - Continue Learning */}
                        <h2 className="text-2xl font-bold text-black mb-6">Your Learning Paths</h2>
                        <div className="grid-cards mb-12">
                            <Link to="/learning" className="block group">
                                <div className="card-white h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-4 rounded-full bg-electric-blue">
                                            <BookOpen className="text-white" size={28} />
                                        </div>
                                        <ArrowRight className="text-grey group-hover:text-electric-blue transition-colors" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2">Continue Learning</h3>
                                    <p className="text-grey text-sm mb-4">
                                        Master budgeting, saving, and investing
                                    </p>
                                    <div className="progress-bar mb-2">
                                        <div className="progress-fill" style={{ width: `${stats.overallProgress}%` }}></div>
                                    </div>
                                    <p className="text-xs text-grey">{stats.overallProgress}% Complete</p>
                                </div>
                            </Link>

                            <Link to="/investments" className="block group">
                                <div className="card-white h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-4 rounded-full bg-electric-blue">
                                            <TrendingUp className="text-white" size={28} />
                                        </div>
                                        <ArrowRight className="text-grey group-hover:text-electric-blue transition-colors" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2">Explore Investments</h3>
                                    <p className="text-grey text-sm mb-4">
                                        Discover opportunities in Kenya
                                    </p>
                                    <span className="badge-blue">7 Available</span>
                                </div>
                            </Link>
                        </div>

                        {/* Achievement Section */}
                        {stats.completedModules > 0 && (
                            <div className="card-white mb-8 bg-light-blue border-2 border-electric-blue/20">
                                <div className="flex items-center gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="p-5 rounded-full bg-gold">
                                            <Trophy className="text-white" size={36} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-black mb-2">
                                            🎉 Great Progress!
                                        </h3>
                                        <p className="text-grey">
                                            You've completed <span className="text-electric-blue font-bold">{stats.completedModules}</span> modules.
                                            Keep learning to achieve your financial goals!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* New User - Get Started */}
                        <h2 className="text-2xl font-bold text-black mb-6">Get Started with Your Financial Journey</h2>
                        <div className="grid-cards mb-12">
                            <Link to="/learning" className="block group">
                                <div className="card-white h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-4 rounded-full bg-electric-blue">
                                            <BookOpen className="text-white" size={28} />
                                        </div>
                                        <ArrowRight className="text-grey group-hover:text-electric-blue transition-colors" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2">Choose Your Learning Path</h3>
                                    <p className="text-grey text-sm">
                                        Browse beginner, intermediate, and advanced paths to start your financial literacy journey
                                    </p>
                                </div>
                            </Link>

                            <Link to="/investments" className="block group">
                                <div className="card-white h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-4 rounded-full bg-electric-blue">
                                            <TrendingUp className="text-white" size={28} />
                                        </div>
                                        <ArrowRight className="text-grey group-hover:text-electric-blue transition-colors" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2">Explore Investments</h3>
                                    <p className="text-grey text-sm mb-4">
                                        Discover opportunities in Kenya
                                    </p>
                                    <span className="badge-blue">7 Available</span>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
