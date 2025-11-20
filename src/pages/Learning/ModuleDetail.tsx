import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/ui/Button';
import { ChevronLeft, PlayCircle, CheckCircle, XCircle } from 'lucide-react';

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

        // Check if all questions are answered
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

    if (isLoading) return <div className="p-8 text-center">Loading module...</div>;
    if (!module) return <div className="p-8 text-center">Module not found</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Link to="/learning" className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
                <ChevronLeft size={20} className="mr-1" />
                Back to Learning Paths
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="text-sm text-primary font-medium mb-2">{module.path.title}</div>
                    <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                </div>

                <div className="p-6 space-y-6">
                    {/* Video Section */}
                    {module.videoUrl ? (
                        <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
                            <iframe
                                src={module.videoUrl.replace('watch?v=', 'embed/')}
                                title={module.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-64"
                            />
                        </div>
                    ) : (
                        <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg flex items-center justify-center text-white h-64">
                            <div className="text-center">
                                <PlayCircle size={48} className="mx-auto mb-2 opacity-80" />
                                <p>Video Content Placeholder</p>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                        {module.content}
                    </div>

                    {/* Quiz Section */}
                    <div className="border-t border-gray-100 pt-6">
                        {!showQuiz && !quizResult ? (
                            <Button onClick={() => setShowQuiz(true)} className="w-full">
                                Take Quiz
                            </Button>
                        ) : quizResult ? (
                            <div className="space-y-6">
                                <div className={`p-6 rounded-lg ${quizResult.passed ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                                    <div className="flex items-center justify-center mb-4">
                                        {quizResult.passed ? (
                                            <CheckCircle className="text-green-600" size={48} />
                                        ) : (
                                            <XCircle className="text-orange-600" size={48} />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-center mb-2">
                                        {quizResult.passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
                                    </h3>
                                    <p className="text-center text-gray-700 mb-4">
                                        You scored {quizResult.score}% ({quizResult.correctAnswers} out of {quizResult.totalQuestions} correct)
                                    </p>
                                    {quizResult.passed ? (
                                        <p className="text-center text-sm text-gray-600">
                                            Great job! You've completed this module.
                                        </p>
                                    ) : (
                                        <p className="text-center text-sm text-gray-600">
                                            You need 70% to pass. Review the content and try again!
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => { setShowQuiz(true); setQuizResult(null); setQuizAnswers({}); }} className="flex-1">
                                        Retake Quiz
                                    </Button>
                                    <Button onClick={() => navigate('/learning')} className="flex-1">
                                        Back to Learning Paths
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900">Module Quiz</h3>
                                {module.quizQuestions.map((q, idx) => (
                                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                                        <div className="space-y-2">
                                            {q.options.map((option, optIdx) => (
                                                <label
                                                    key={optIdx}
                                                    className={`flex items-center space-x-3 p-3 bg-white rounded border cursor-pointer transition-colors ${quizAnswers[idx] === option
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-gray-200 hover:border-primary/50'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question-${idx}`}
                                                        value={option}
                                                        checked={quizAnswers[idx] === option}
                                                        onChange={() => handleAnswerChange(idx, option)}
                                                        className="text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    onClick={handleSubmitQuiz}
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
