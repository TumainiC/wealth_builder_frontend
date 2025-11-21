import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, BookOpen, Award, TrendingUp } from 'lucide-react';
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
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Profile</h1>
                    <p className="text-grey">Manage your account and track your progress</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* User Info Card */}
                    <div className="card-white">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-electric-blue flex items-center justify-center">
                                <User className="text-white" size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-black">{user?.email}</h2>
                                <p className="text-grey text-sm">Member since 2025</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-grey">Literacy Level</span>
                                <span className="font-semibold text-black">{user?.literacyLevel}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-grey">Primary Goal</span>
                                <span className="font-semibold text-black">{user?.primaryGoal}</span>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full btn-pill-secondary mt-6 text-red-500 border-red-300 hover:bg-red-50"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Learning Progress Card */}
                    <div className="card-white">
                        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                            <Award className="text-electric-blue" size={24} />
                            Learning Progress
                        </h3>
                        {isLoadingProgress ? (
                            <div className="text-grey">Loading progress...</div>
                        ) : progress ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-light-grey rounded-xl">
                                        <div className="text-2xl font-bold text-black">{progress.completedModules}</div>
                                        <div className="text-xs text-grey">Completed</div>
                                    </div>
                                    <div className="text-center p-4 bg-light-grey rounded-xl">
                                        <div className="text-2xl font-bold text-black">{progress.totalModules}</div>
                                        <div className="text-xs text-grey">Total Modules</div>
                                    </div>
                                    <div className="text-center p-4 bg-light-grey rounded-xl">
                                        <div className="text-2xl font-bold text-electric-blue">{progress.averageQuizScore}%</div>
                                        <div className="text-xs text-grey">Avg Score</div>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${progress.completionPercentage}%` }}></div>
                                </div>
                                <p className="text-sm text-grey text-center">
                                    {progress.completionPercentage}% Complete
                                </p>
                            </div>
                        ) : (
                            <div className="text-grey">No progress data available</div>
                        )}
                    </div>

                    {/* Change Password Card */}
                    <div className="card-white lg:col-span-2">
                        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                            <Lock className="text-electric-blue" size={24} />
                            Change Password
                        </h3>

                        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                            {message && (
                                <div className={`p-4 rounded-xl text-sm ${message.type === 'success'
                                        ? 'bg-green-50 border border-green-200 text-green-700'
                                        : 'bg-red-50 border border-red-200 text-red-600'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    required
                                    className="input-clean"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    required
                                    className="input-clean"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    required
                                    className="input-clean"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="btn-pill-primary"
                            >
                                {isUpdating ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
