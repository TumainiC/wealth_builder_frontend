import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, ChevronRight } from 'lucide-react';

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
        return <div className="p-8 text-center">Loading learning paths...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
                <p className="text-gray-600">Choose a track to start building your financial knowledge.</p>
            </div>

            <div className="grid gap-6">
                {paths.map((path) => (
                    <Card key={path.id} className="hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-bold text-gray-900">{path.title}</h2>
                                    <Badge variant={path.level === 'BEGINNER' ? 'success' : path.level === 'INTERMEDIATE' ? 'warning' : 'info'}>
                                        {path.level}
                                    </Badge>
                                </div>
                                <p className="text-gray-600 mb-4">{path.description}</p>

                                <div className="space-y-2">
                                    <h3 className="font-medium text-gray-900 text-sm">Modules:</h3>
                                    {path.modules.map((module) => (
                                        <Link
                                            key={module.id}
                                            to={`/learning/module/${module.id}`}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-white p-1.5 rounded shadow-sm text-gray-500 group-hover:text-primary">
                                                    <BookOpen size={16} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                    {module.order}. {module.title}
                                                </span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
