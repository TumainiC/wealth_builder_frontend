import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Settings, Award, LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();

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
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-gray-500 mb-2">You have completed</p>
                            <p className="text-3xl font-bold text-primary">0 / 12</p>
                            <p className="text-gray-500 mt-1">Modules</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 text-center">
                                Keep going! You're on your way to financial freedom.
                            </p>
                        </div>
                    </Card>

                    {/* Account Settings */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Settings size={20} className="mr-2 text-gray-600" />
                            Account Settings
                        </h3>

                        <form className="space-y-4">
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Change Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="New password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="pt-2">
                                <Button disabled title="Feature coming soon">
                                    Update Settings
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};
