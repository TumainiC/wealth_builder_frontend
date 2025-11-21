import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ChevronRight, GraduationCap, Target, Rocket, CheckCircle } from 'lucide-react';

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

interface UserProgress {
    moduleId: string;
    completed: boolean;
    quizScore: number | null;
}

const levelConfig = {
    BEGINNER: {
        icon: GraduationCap,
        emoji: '🌱',
        badge: 'Beginner Friendly'
    },
    INTERMEDIATE: {
        icon: Target,
        emoji: '🎯',
        badge: 'Intermediate Level'
    },
    ADVANCED: {
        icon: Rocket,
        emoji: '🚀',
        badge: 'Advanced Topics'
    }
};

export const PathList: React.FC = () => {
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch learning paths
                const pathsResponse = await axios.get('http://localhost:5000/api/learning/paths');
                setPaths(pathsResponse.data);

                // Fetch user progress if authenticated
                if (token) {
                    try {
                        const progressResponse = await axios.get(
                            'http://localhost:5000/api/user/progress',
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setUserProgress(progressResponse.data.progress);
                    } catch (error) {
                        console.error('Failed to fetch user progress', error);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch paths', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Clean Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Learning Paths</h1>
                    <p className="text-grey">Choose your learning path and start mastering financial skills</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-white h-64 animate-pulse bg-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {paths.map((path) => {
                            const config = levelConfig[path.level];
                            const Icon = config.icon;

                            return (
                                <div key={path.id} className="card-white">
                                    {/* Path Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-full bg-electric-blue">
                                                <Icon className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-2xl font-bold text-black">{path.title}</h2>
                                                    <span className="badge-blue text-xs">{config.badge}</span>
                                                </div>
                                                <p className="text-grey">{path.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modules Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {path.modules.map((module) => {
                                            const moduleProgress = userProgress.find(p => p.moduleId === module.id);
                                            const isCompleted = moduleProgress?.completed || false;

                                            return (
                                                <Link
                                                    key={module.id}
                                                    to={`/learning/module/${module.id}`}
                                                    className="group"
                                                >
                                                    <div className={`p-4 border rounded-xl transition-all ${isCompleted
                                                        ? 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-md'
                                                        : 'border-gray-100 bg-light-grey hover:bg-white hover:border-electric-blue hover:shadow-md'
                                                        }`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                {isCompleted ? (
                                                                    <CheckCircle className="text-green-500" size={18} strokeWidth={2} />
                                                                ) : (
                                                                    <BookOpen className="text-electric-blue" size={18} strokeWidth={1.5} />
                                                                )}
                                                                <span className={`text-xs font-medium ${isCompleted ? 'text-green-600' : 'text-grey'}`}>
                                                                    Module {module.order}
                                                                </span>
                                                            </div>
                                                            <ChevronRight className={`transition-colors ${isCompleted ? 'text-green-500 group-hover:text-green-600' : 'text-grey group-hover:text-electric-blue'
                                                                }`} size={18} />
                                                        </div>
                                                        <h3 className={`font-semibold transition-colors ${isCompleted
                                                            ? 'text-green-700 group-hover:text-green-800'
                                                            : 'text-black group-hover:text-electric-blue'
                                                            }`}>
                                                            {module.title}
                                                        </h3>
                                                        {isCompleted && moduleProgress?.quizScore && (
                                                            <p className="text-xs text-green-600 mt-1">
                                                                Score: {moduleProgress.quizScore}%
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
