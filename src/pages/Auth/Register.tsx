import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Sparkles, Rocket, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [literacyLevel, setLiteracyLevel] = useState('BEGINNER');
    const [primaryGoal, setPrimaryGoal] = useState('LEARNING');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
                literacyLevel,
                primaryGoal,
            });

            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-4 animate-pulse-glow">
                        <Rocket className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text-teal mb-2">Start Your Journey</h1>
                    <p className="text-gray-400">Create an account to unlock financial freedom</p>
                </div>

                {/* Register Card */}
                <div className="card-vibrant rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Financial Literacy Level
                            </label>
                            <select
                                value={literacyLevel}
                                onChange={(e) => setLiteracyLevel(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            >
                                <option value="BEGINNER">🌱 Beginner - Just starting out</option>
                                <option value="INTERMEDIATE">🎯 Intermediate - Some knowledge</option>
                                <option value="ADVANCED">🚀 Advanced - Experienced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Primary Goal
                            </label>
                            <select
                                value={primaryGoal}
                                onChange={(e) => setPrimaryGoal(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            >
                                <option value="LEARNING">📚 Learning - Build financial knowledge</option>
                                <option value="INVESTING">💰 Investing - Grow my wealth</option>
                            </select>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-4 text-lg font-semibold rounded-xl btn-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                'Creating Account...'
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Create Account
                                </>
                            )}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors inline-flex items-center gap-1">
                                    Sign in
                                    <ArrowRight size={16} />
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Back to Landing */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
