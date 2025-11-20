import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/ui/Button';
import { ChevronLeft, PlayCircle, CheckCircle, XCircle, BookOpen, Target, Award, ArrowRight, Clock, TrendingUp } from 'lucide-react';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface Module {
    id: string;
    title: string;
    content: string;
    videoUrl?: string;
    quizQuestions: QuizQuestion[];
    path: {
        id: string;
        title: string;
    };
}

interface QuizResult {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    passed: boolean;
}

export const ModuleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [module, setModule] = useState<Module | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/learning/modules/${id}`);
                setModule(response.data);
            } catch (error) {
                console.error('Failed to fetch module', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModule();
    }, [id]);

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };

    const handleSubmitQuiz = async () => {
        if (!module) return;

        const allAnswered = module.quizQuestions.every((_, index) => quizAnswers[index]);
        if (!allAnswered) {
            alert('Please answer all questions before submitting');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const answersArray = module.quizQuestions.map((_, index) => quizAnswers[index]);

            const response = await axios.post(
                'http://localhost:5000/api/learning/quiz',
                {
                    moduleId: module.id,
                    answers: answersArray
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setQuizResult(response.data);
        } catch (error) {
            console.error('Failed to submit quiz', error);
            alert('Failed to submit quiz. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Parse content into sections
    const parseContent = (content: string) => {
        const sections = content.split('\n\n');
        return sections.filter(s => s.trim().length > 0);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 font-medium">Loading module...</p>
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full card-vibrant rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="text-red-400" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Module Not Found</h2>
                    <p className="text-gray-400 mb-6">This module could not be loaded.</p>
                    <Link to="/learning">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white btn-glow">
                            Back to Learning Paths
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const contentSections = parseContent(module.content);

    return (
        <div className="min-h-screen bg-gray-900 pb-12">
            {/* Header with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link 
                        to="/learning" 
                        className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ChevronLeft size={20} className="mr-1" />
                        Back to Learning Paths
                    </Link>
                    
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                            <div className="text-sm font-medium mb-2 text-white/80">{module.path.title}</div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{module.title}</h1>
                            
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Clock size={18} />
                                    <span className="text-sm font-medium">15-20 min read</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <BookOpen size={18} />
                                    <span className="text-sm font-medium">{module.quizQuestions.length} Quiz Questions</span>
                                </div>
                            </div>
                        </div>
                        
                        {!quizResult && !showQuiz && (
                            <Button 
                                onClick={() => setShowQuiz(true)}
                                className="bg-white text-purple-600 hover:bg-gray-100 btn-glow hidden md:flex items-center gap-2"
                            >
                                <Target size={20} />
                                Take Quiz
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Content Sections */}
                        {contentSections.map((section, idx) => (
                            <div 
                                key={idx} 
                                className="content-section glass animate-slide-in"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line flex-1">
                                        {section}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Quiz Section */}
                        {showQuiz && !quizResult && (
                            <div className="card-vibrant rounded-2xl p-6 md:p-8 animate-slide-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <Target className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Test Your Knowledge</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    {module.quizQuestions.map((q, idx) => (
                                        <div key={idx} className="glass p-5 rounded-xl">
                                            <p className="font-semibold text-white mb-4 text-lg">
                                                Question {idx + 1}: {q.question}
                                            </p>
                                            <div className="space-y-3">
                                                {q.options.map((option, optIdx) => (
                                                    <label
                                                        key={optIdx}
                                                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                                                            quizAnswers[idx] === option
                                                                ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-500'
                                                                : 'bg-gray-800/50 border-2 border-gray-700 hover:border-purple-500/50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question-${idx}`}
                                                            value={option}
                                                            checked={quizAnswers[idx] === option}
                                                            onChange={() => handleAnswerChange(idx, option)}
                                                            className="text-purple-600 focus:ring-purple-500 focus:ring-2"
                                                        />
                                                        <span className="text-gray-200 flex-1">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleSubmitQuiz}
                                    disabled={isSubmitting || Object.keys(quizAnswers).length < module.quizQuestions.length}
                                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                                </Button>
                            </div>
                        )}

                        {/* Quiz Result */}
                        {quizResult && (
                            <div className="card-vibrant rounded-2xl p-8 animate-slide-in">
                                <div className={`text-center mb-8 ${quizResult.passed ? '' : ''}`}>
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                                        quizResult.passed 
                                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse-glow' 
                                            : 'bg-gradient-to-br from-orange-500 to-red-600'
                                    }`}>
                                        {quizResult.passed ? (
                                            <Award className="text-white" size={48} />
                                        ) : (
                                            <TrendingUp className="text-white" size={48} />
                                        )}
                                    </div>
                                    
                                    <h3 className="text-3xl font-bold text-white mb-3">
                                        {quizResult.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
                                    </h3>
                                    
                                    <div className="text-5xl font-bold gradient-text mb-2">
                                        {quizResult.score}%
                                    </div>
                                    
                                    <p className="text-gray-300 text-lg mb-6">
                                        You got {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correct
                                    </p>
                                    
                                    {quizResult.passed ? (
                                        <p className="text-emerald-400 font-medium">
                                            ✓ Module Completed! You're making great progress.
                                        </p>
                                    ) : (
                                        <p className="text-orange-400 font-medium">
                                            You need 70% to pass. Review the content and try again!
                                        </p>
                                    )}
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => { setShowQuiz(true); setQuizResult(null); setQuizAnswers({}); }}
                                        className="w-full border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                                    >
                                        Retake Quiz
                                    </Button>
                                    <Button 
                                        onClick={() => navigate('/learning')}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white btn-glow"
                                    >
                                        Continue Learning <ArrowRight size={20} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        <div className="card-vibrant rounded-2xl p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Module Status</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        quizResult?.passed 
                                            ? 'bg-green-500/20 text-green-400' 
                                            : 'bg-orange-500/20 text-orange-400'
                                    }`}>
                                        {quizResult?.passed ? 'Completed' : 'In Progress'}
                                    </span>
                                </div>
                                
                                {quizResult && (
                                    <div className="pt-4 border-t border-gray-700">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold gradient-text mb-1">
                                                {quizResult.score}%
                                            </div>
                                            <div className="text-gray-400 text-sm">Quiz Score</div>
                                        </div>
                                    </div>
                                )}
                                
                                {!showQuiz && !quizResult && (
                                    <Button 
                                        onClick={() => setShowQuiz(true)}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white btn-glow flex items-center justify-center gap-2"
                                    >
                                        <Target size={20} />
                                        Start Quiz
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Learning Tips Card */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">💡 Learning Tips</h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-1" />
                                    <span>Read through all content carefully</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-1" />
                                    <span>Take notes on key concepts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-1" />
                                    <span>Apply what you learn to real situations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
