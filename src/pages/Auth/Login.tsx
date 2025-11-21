import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.code === 'ERR_NETWORK') {
                setError('Unable to connect to the server. Please check if the backend is running.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-grey flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue rounded-2xl mb-4">
                        <span className="text-white font-bold text-2xl">W</span>
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                    <p className="text-grey">Sign in to continue your learning journey</p>
                </div>

                {/* Login Card */}
                <div className="card-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="input-clean"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
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
                                    className="input-clean pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-pill-primary flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                'Signing in...'
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-grey text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-electric-blue font-semibold hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Back to Landing */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-grey hover:text-black text-sm transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
