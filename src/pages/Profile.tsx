import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Settings, Award, LogOut, Lock, CheckCircle, BookOpen } from 'lucide-react';
import axios from 'axios';

interface UserProgress {
    totalModules: number;
    completedModules: number;
    completionPercentage: number;
    averageQuizScore: number;
    progress: Array<{
        moduleId: string;
        module: {
            title: string;
            path: {
                title: string;
            };
        };
        completed: boolean;
        quizScore: number | null;
        completedAt: string;
    }>;
}

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/user/progress', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProgress(response.data);
        } catch (error) {
            console.error('Failed to fetch progress', error);
        } finally {
            setIsLoadingProgress(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setIsUpdating(true);

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'http://localhost:5000/api/user/profile',
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update password'
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* User Info Card */}
                <Card className="md:col-span-1 p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <User size={48} className="text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user.email}</h2>
                        <p className="text-sm text-gray-500 mt-1">Member since {new Date().getFullYear()}</p>

                        <div className="mt-6 w-full space-y-2">
                            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                                <span className="text-gray-500">Literacy Level</span>
                                <span className="font-medium capitalize">{user.literacyLevel}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                                <span className="text-gray-500">Primary Goal</span>
                                <span className="font-medium capitalize">{user.primaryGoal}</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-6 flex items-center justify-center text-red-600 border-red-200 hover:bg-red-50"
                            onClick={logout}
                        >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </Card>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {/* Progress Overview */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Award size={20} className="mr-2 text-primary" />
                            Learning Progress
                        </h3>

                        {isLoadingProgress ? (
                            <div className="text-center py-8 text-gray-500">Loading progress...</div>
                        ) : progress ? (
                            <>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-primary/5 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-primary">{progress.completedModules}</p>
                                        <p className="text-xs text-gray-600 mt-1">Completed</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-blue-600">{progress.totalModules}</p>
                                        <p className="text-xs text-gray-600 mt-1">Total Modules</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-green-600">{progress.completionPercentage}%</p>
                                        <p className="text-xs text-gray-600 mt-1">Complete</p>
                                    </div>
                                </div>

                                {progress.averageQuizScore > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Average Quiz Score:</span> {progress.averageQuizScore}%
                                        </p>
                                    </div>
                                )}

                                {/* Progress bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Overall Progress</span>
                                        <span className="font-medium text-primary">{progress.completionPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-primary rounded-full h-3 transition-all duration-500"
                                            style={{ width: `${progress.completionPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Completed Modules List */}
                                {progress.progress.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                            <BookOpen size={16} className="mr-2" />
                                            Recent Activity
                                        </h4>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {progress.progress.slice(0, 5).map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {item.module.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{item.module.path.title}</p>
                                                        {item.quizScore !== null && (
                                                            <p className="text-xs text-primary font-medium mt-1">
                                                                Quiz Score: {item.quizScore}%
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {progress.completedModules === 0 && (
                                    <p className="text-sm text-gray-500 text-center mt-4">
                                        Start learning to see your progress here!
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Failed to load progress data
                            </div>
                        )}
                    </Card>

                    {/* Password Change */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Lock size={20} className="mr-2 text-gray-600" />
                            Change Password
                        </h3>

                        {message && (
                            <div className={`mb-4 p-3 rounded-lg ${message.type === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                    : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                    minLength={6}
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <Button type="submit" disabled={isUpdating}>
                                    {isUpdating ? 'Updating...' : 'Update Password'}
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Account Settings */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Settings size={20} className="mr-2 text-gray-600" />
                            Account Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
