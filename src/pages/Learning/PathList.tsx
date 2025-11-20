import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, ChevronRight, GraduationCap, Target, Rocket, Sparkles, Zap, TrendingUp } from 'lucide-react';

interface Module {
    id: string;
    title: string;
    order: number;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    modules: Module[];
}

const levelConfig = {
    BEGINNER: {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        icon: GraduationCap,
        color: 'emerald',
        emoji: '🌱'
    },
    INTERMEDIATE: {
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        icon: Target,
        color: 'blue',
        emoji: '🎯'
    },
    ADVANCED: {
        gradient: 'from-purple-500 via-pink-500 to-red-500',
        icon: Rocket,
        color: 'purple',
        emoji: '🚀'
    }
};

export const PathList: React.FC = () => {
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/learning/paths');
                setPaths(response.data);
            } catch (error) {
                console.error('Failed to fetch paths', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaths();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 font-medium">Loading learning paths...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Sparkles className="text-yellow-300 animate-pulse-glow" size={40} />
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Learning Paths</h1>
                        </div>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Choose your track and start building your financial knowledge today
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8">
                    {paths.map((path, index) => {
                        const config = levelConfig[path.level];
                        const Icon = config.icon;

                        return (
                            <div
                                key={path.id}
                                className="card-vibrant rounded-2xl overflow-hidden hover-lift animate-slide-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Gradient Header */}
                                <div className={`bg-gradient-to-r ${config.gradient} p-6 md:p-8 relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                    <div className="relative flex items-start justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                                                <Icon size={32} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-3xl">{config.emoji}</span>
                                                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-sm font-semibold px-3 py-1">
                                                        {path.level}
                                                    </Badge>
                                                </div>
                                                <h2 className="text-3xl font-bold text-white">{path.title}</h2>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <BookOpen size={18} className="text-white" />
                                            <span className="text-white font-medium">{path.modules.length} Modules</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                        {path.description}
                                    </p>

                                    {/* Modules Grid */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-white text-lg">Course Modules</h3>
                                            <Zap className="text-yellow-400" size={20} />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {path.modules.map((module) => (
                                                <Link
                                                    key={module.id}
                                                    to={`/learning/module/${module.id}`}
                                                    className="group"
                                                >
                                                    <div className="glass-vibrant p-4 rounded-xl hover:bg-purple-500/20 transition-all">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold`}>
                                                                {module.order}
                                                            </div>
                                                            <div className="flex-1">
                                                                <span className="text-white font-medium group-hover:text-purple-300 transition-colors block">
                                                                    {module.title}
                                                                </span>
                                                            </div>
                                                            <ChevronRight
                                                                className="text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0"
                                                                size={20}
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <Link to={`/learning/module/${path.modules[0]?.id}`}>
                                            <button className={`w-full bg-gradient-to-r ${config.gradient} text-white font-semibold py-4 px-6 rounded-xl btn-glow flex items-center justify-center gap-2 group`}>
                                                <span>Start Learning</span>
                                                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 glass rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Financial Future?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Start with any path that matches your current level. You can always come back and explore others!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <GraduationCap size={20} />
                            <span className="font-medium">🌱 Start as Beginner</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400">
                            <Target size={20} />
                            <span className="font-medium">🎯 Build Skills</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400">
                            <Rocket size={20} />
                            <span className="font-medium">🚀 Master Advanced Topics</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
