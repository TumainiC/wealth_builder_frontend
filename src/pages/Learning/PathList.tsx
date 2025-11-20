import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, ChevronRight, GraduationCap, Target, Rocket } from 'lucide-react';

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

const levelColors = {
    BEGINNER: 'from-emerald-500 to-teal-600',
    INTERMEDIATE: 'from-blue-500 to-indigo-600',
    ADVANCED: 'from-purple-500 to-pink-600'
};

const levelIcons = {
    BEGINNER: GraduationCap,
    INTERMEDIATE: Target,
    ADVANCED: Rocket
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
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading learning paths...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Paths</h1>
                        <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                            Choose a track to start building your financial knowledge and achieve your goals.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8">
                    {paths.map((path, index) => {
                        const Icon = levelIcons[path.level];
                        const gradientClass = levelColors[path.level];

                        return (
                            <Card key={path.id} className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                {/* Gradient Background */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradientClass} opacity-10 rounded-bl-full transform group-hover:scale-110 transition-transform duration-500`}></div>

                                <div className="relative p-8">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} text-white shadow-lg`}>
                                                    <Icon size={32} />
                                                </div>
                                                <div>
                                                    <Badge className={`mb-2 bg-gradient-to-r ${gradientClass} text-white border-0`}>
                                                        {path.level}
                                                    </Badge>
                                                    <h2 className="text-2xl font-bold text-gray-900">{path.title}</h2>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                                {path.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-gray-500 mb-6">
                                                <BookOpen size={20} />
                                                <span className="font-medium">{path.modules.length} Modules</span>
                                            </div>

                                            {/* Modules List */}
                                            <div className="space-y-2">
                                                <h3 className="font-semibold text-gray-900 mb-3">Course Modules:</h3>
                                                <div className="grid gap-2">
                                                    {path.modules.slice(0, 4).map((module) => (
                                                        <Link
                                                            key={module.id}
                                                            to={`/learning/module/${module.id}`}
                                                            className="group/module flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-200"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 group-hover/module:border-emerald-500 flex items-center justify-center text-sm font-semibold text-gray-600 group-hover/module:text-emerald-600 transition-colors">
                                                                    {module.order}
                                                                </div>
                                                                <span className="text-gray-700 group-hover/module:text-emerald-700 font-medium transition-colors">
                                                                    {module.title}
                                                                </span>
                                                            </div>
                                                            <ChevronRight className="text-gray-400 group-hover/module:text-emerald-600 transition-colors" size={20} />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
