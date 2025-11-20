import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Clock, AlertTriangle, ChevronLeft, Building, Target, PieChart } from 'lucide-react';

interface Investment {
    id: string;
    title: string;
    description: string;
    amountRequested: number;
    amountRaised: number;
    returnRate: number;
    duration: string;
    riskLevel: string;
    category: string;
}

export const InvestmentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [investment, setInvestment] = useState<Investment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInvestment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/investments/${id}`);
                setInvestment(response.data);
            } catch (error) {
                console.error('Failed to fetch investment', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchInvestment();
        }
    }, [id]);

    if (isLoading) {
        return <div className="p-8 text-center">Loading investment details...</div>;
    }

    if (!investment) {
        return <div className="p-8 text-center">Investment not found.</div>;
    }

    const progress = (investment.amountRaised / investment.amountRequested) * 100;

    return (
        <div className="space-y-6">
            <Link to="/investments" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <ChevronLeft size={20} className="mr-1" />
                Back to Opportunities
            </Link>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="info">{investment.category}</Badge>
                            <span className="text-lg font-bold text-green-600 flex items-center">
                                <TrendingUp size={20} className="mr-1" />
                                {investment.returnRate}% Return
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{investment.title}</h1>

                        <div className="prose max-w-none text-gray-600 mb-6">
                            <p>{investment.description}</p>
                            <p className="mt-4">
                                This business has been vetted by our team and shows strong potential for growth.
                                The funds will be used to expand operations and meet increasing customer demand.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
                            <div className="flex items-center text-gray-700">
                                <Clock size={20} className="mr-2 text-primary" />
                                <div>
                                    <p className="text-xs text-gray-500">Duration</p>
                                    <p className="font-medium">{investment.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <AlertTriangle size={20} className="mr-2 text-orange-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Risk Level</p>
                                    <p className="font-medium">{investment.riskLevel}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Building size={20} className="mr-2 text-blue-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Category</p>
                                    <p className="font-medium">{investment.category}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <PieChart size={20} className="mr-2" />
                            Financial Highlights
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Projected Revenue</p>
                                <p className="text-lg font-bold text-gray-900">KES 1.2M / year</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Profit Margin</p>
                                <p className="text-lg font-bold text-gray-900">18%</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 sticky top-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Target size={20} className="mr-2" />
                            Funding Progress
                        </h3>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Raised</span>
                                <span className="font-bold text-gray-900">
                                    KES {investment.amountRaised.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                <div
                                    className="bg-primary h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{progress.toFixed(0)}% funded</span>
                                <span>Goal: KES {investment.amountRequested.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full" disabled title="Coming soon in next version">
                                Invest Now
                            </Button>
                            <p className="text-xs text-center text-gray-500">
                                * Investment features are currently in preview mode.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
