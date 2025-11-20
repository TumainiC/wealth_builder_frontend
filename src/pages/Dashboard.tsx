import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { TrendingUp, BookOpen, Target, Award, ArrowRight, Sparkles, Zap, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserStats {
    completedModules: number;
    totalQuizzesTaken: number;
    averageScore: number;
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
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="text-yellow-300 animate-pulse-glow" size={32} />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Welcome back, {userName}!
                        </h1>
                    </div>
                    <p className="text-xl text-white/90 max-w-2xl">
                        Continue your financial learning journey and unlock new opportunities.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Stats Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-vibrant rounded-2xl p-8 h-40 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="card-vibrant rounded-2xl p-6 md:p-8 hover-lift">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                                    <BookOpen className="text-white" size={24} />
                                </div>
                                <Zap className="text-yellow-400 animate-pulse" size={20} />
                            </div>
                            <div className="text-4xl font-bold gradient-text mb-2">
                                {stats?.completedModules || 0}
                            </div>
                            <div className="text-gray-400 font-medium">Modules Completed</div>
                        </div>

                        <div className="card-vibrant rounded-2xl p-6 md:p-8 hover-lift">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                                    <Target className="text-white" size={24} />
                                </div>
                                <Zap className="text-yellow-400 animate-pulse" size={20} />
                            </div>
                            <div className="text-4xl font-bold gradient-text-teal mb-2">
                                {stats?.totalQuizzesTaken || 0}
                            </div>
                            <div className="text-gray-400 font-medium">Quizzes Taken</div>
                        </div>

                        <div className="card-vibrant rounded-2xl p-6 md:p-8 hover-lift">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500">
                                    <Award className="text-white" size={24} />
                                </div>
                                <Zap className="text-yellow-400 animate-pulse" size={20} />
                            </div>
                            <div className="text-4xl font-bold gradient-text mb-2">
                                {stats?.averageScore || 0}%
                            </div>
                            <div className="text-gray-400 font-medium">Average Score</div>
                        </div>
                    </div>
                )}

                {/* Quick Actions Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <Link to="/learning" className="block group">
                        <div className="card-vibrant rounded-2xl p-8 hover-lift h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                                    <BookOpen className="text-white" size={32} />
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:text-purple-400 transition-colors" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Continue Learning</h3>
                            <p className="text-gray-400 mb-4">
                                Explore learning paths and master new financial concepts
                            </p>
                            <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
                                Browse Modules
                                <Sparkles size={16} />
                            </div>
                        </div>
                    </Link>

                    <Link to="/investments" className="block group">
                        <div className="card-vibrant rounded-2xl p-8 hover-lift h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500">
                                    <TrendingUp className="text-white" size={32} />
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:text-teal-400 transition-colors" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Explore Investments</h3>
                            <p className="text-gray-400 mb-4">
                                Discover investment opportunities tailored for Kenya
                            </p>
                            <div className="inline-flex items-center gap-2 text-teal-400 font-medium">
                                View Opportunities
                                <Sparkles size={16} />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Achievement Banner */}
                {stats && stats.completedModules > 0 && (
                    <div className="card-vibrant rounded-2xl p-8 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
                        <div className="relative flex items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 animate-pulse-glow">
                                    <Trophy className="text-white" size={48} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    🎉 Great Progress!
                                </h3>
                                <p className="text-gray-300 text-lg">
                                    You've completed <span className="text-yellow-400 font-bold">{stats.completedModules}</span> modules.
                                    Keep up the amazing work and continue growing your financial knowledge!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Learning Tips */}
                <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">💡 Tips for Success</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Learn Consistently</h4>
                                <p className="text-gray-400 text-sm">
                                    Set aside time each day to study and complete modules
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Practice with Quizzes</h4>
                                <p className="text-gray-400 text-sm">
                                    Test your knowledge to reinforce what you've learned
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                                <span className="text-2xl">💸</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Apply Your Knowledge</h4>
                                <p className="text-gray-400 text-sm">
                                    Start small investments based on what you learn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
