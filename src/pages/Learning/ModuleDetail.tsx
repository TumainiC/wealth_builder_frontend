import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, CheckCircle, XCircle, BookOpen, Award } from 'lucide-react';

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
                    moduleId: id,
                    answers: answersArray
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setQuizResult(response.data);
        } catch (error) {
            console.error('Failed to submit quiz', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-grey">Loading module...</div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-grey">Module not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link to="/learning" className="inline-flex items-center gap-2 text-grey hover:text-black mb-4 transition-colors">
                        <ChevronLeft size={20} />
                        Back to Learning Paths
                    </Link>
                    <h1 className="text-3xl font-bold text-black mb-2">{module.title}</h1>
                    <p className="text-grey">{module.path.title}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!showQuiz && !quizResult && (
                    <>
                        {/* Content Card */}
                        <div className="card-white mb-8">
                            <div className="space-y-4 text-black leading-relaxed">
                                {module.content.split('\n').map((paragraph, index) => {
                                    if (!paragraph.trim()) return null;

                                    // Check if it's a bullet point
                                    if (paragraph.trim().startsWith('**') && paragraph.includes(':**')) {
                                        // Bold header with content
                                        const parts = paragraph.split(':**');
                                        const header = parts[0].replace(/\*\*/g, '');
                                        const content = parts[1]?.trim();
                                        return (
                                            <div key={index} className="mb-3">
                                                <strong className="text-black font-semibold block mb-1">{header}:</strong>
                                                {content && <p className="text-grey ml-4">{content}</p>}
                                            </div>
                                        );
                                    } else if (paragraph.trim().match(/^\d+\./)) {
                                        // Numbered list item
                                        return (
                                            <div key={index} className="ml-4">
                                                <p className="text-grey">{paragraph.trim()}</p>
                                            </div>
                                        );
                                    } else if (paragraph.trim().startsWith('-')) {
                                        // Bullet point
                                        return (
                                            <div key={index} className="flex gap-2 ml-4">
                                                <span className="text-electric-blue mt-1">•</span>
                                                <p className="text-grey flex-1">{paragraph.replace(/^-\s*/, '')}</p>
                                            </div>
                                        );
                                    } else if (paragraph.trim().startsWith('**')) {
                                        // Bold text
                                        return (
                                            <p key={index} className="font-semibold text-black">
                                                {paragraph.replace(/\*\*/g, '')}
                                            </p>
                                        );
                                    } else {
                                        // Regular paragraph
                                        return (
                                            <p key={index} className="text-grey">
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                })}
                            </div>
                        </div>

                        {/* Start Quiz Button */}
                        <div className="card-white bg-light-blue border-2 border-electric-blue/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-2">Ready to test your knowledge?</h3>
                                    <p className="text-grey">Pass the quiz with 80% or higher to complete this module</p>
                                </div>
                                <button
                                    onClick={() => setShowQuiz(true)}
                                    className="btn-pill-primary"
                                >
                                    Start Quiz
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Quiz Section */}
                {showQuiz && !quizResult && (
                    <div className="space-y-6">
                        {module.quizQuestions.map((question, index) => (
                            <div key={index} className="card-white">
                                <h3 className="font-semibold text-black mb-4">
                                    {index + 1}. {question.question}
                                </h3>
                                <div className="space-y-3">
                                    {question.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${quizAnswers[index] === option
                                                ? 'border-electric-blue bg-light-blue'
                                                : 'border-gray-200 hover:border-electric-blue'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={option}
                                                checked={quizAnswers[index] === option}
                                                onChange={() => handleAnswerChange(index, option)}
                                                className="mr-3 h-4 w-4 text-electric-blue"
                                            />
                                            <span className="text-black">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting}
                            className="w-full btn-pill-primary"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    </div>
                )}

                {/* Quiz Result */}
                {quizResult && (
                    <div className={`card-white ${quizResult.passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                        <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${quizResult.passed ? 'bg-green-500' : 'bg-red-500'
                                }`}>
                                {quizResult.passed ? (
                                    <CheckCircle className="text-white" size={32} />
                                ) : (
                                    <XCircle className="text-white" size={32} />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-black mb-2">
                                {quizResult.passed ? '🎉 Congratulations!' : 'Keep Learning!'}
                            </h2>
                            <p className="text-grey mb-2">
                                You scored {quizResult.score}% ({quizResult.correctAnswers} out of {quizResult.totalQuestions} correct)
                            </p>
                            <p className="text-sm text-grey mb-6">
                                {quizResult.passed
                                    ? '✅ Module completed! You can continue to the next module.'
                                    : '❌ You need 80% or higher to complete this module. Please try again.'}
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link to="/learning" className="btn-pill-primary">
                                    Continue Learning
                                </Link>
                                {!quizResult.passed && (
                                    <button
                                        onClick={() => {
                                            setQuizResult(null);
                                            setQuizAnswers({});
                                            setShowQuiz(true);
                                        }}
                                        className="btn-pill-secondary"
                                    >
                                        Retake Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
