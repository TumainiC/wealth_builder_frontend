import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Dashboard } from './pages/Dashboard';
import { PathList } from './pages/Learning/PathList';
import { ModuleDetail } from './pages/Learning/ModuleDetail';
import { InvestmentList } from './pages/Investments/InvestmentList';
import { InvestmentDetail } from './pages/Investments/InvestmentDetail';
import { BusinessRegistration } from './pages/Investments/BusinessRegistration';
import { Landing } from './pages/Landing';
import { Profile } from './pages/Profile';
import { TermsAndConditions } from './pages/Legal/TermsAndConditions';
import { PrivacyPolicy } from './pages/Legal/PrivacyPolicy';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learning"
                        element={
                            <ProtectedRoute>
                                <PathList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learning/module/:id"
                        element={
                            <ProtectedRoute>
                                <ModuleDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/investments"
                        element={
                            <ProtectedRoute>
                                <InvestmentList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/investments/:id"
                        element={
                            <ProtectedRoute>
                                <InvestmentDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/investments/register-business"
                        element={
                            <ProtectedRoute>
                                <BusinessRegistration />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
