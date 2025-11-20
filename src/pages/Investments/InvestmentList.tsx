import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

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

export const InvestmentList: React.FC = () => {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/investments');
                setInvestments(response.data);
            } catch (error) {
                console.error('Failed to fetch investments', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center">Loading investments...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Investment Opportunities</h1>
                <p className="text-gray-600">Browse vetted small businesses looking for capital.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {investments.map((investment) => {
                    const progress = (investment.amountRaised / investment.amountRequested) * 100;

                    return (
                        <Card key={investment.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant="info">{investment.category}</Badge>
                                <span className="text-sm font-medium text-green-600 flex items-center">
                                    <TrendingUp size={16} className="mr-1" />
                                    {investment.returnRate}% Return
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{investment.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{investment.description}</p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Raised</span>
                                        <span className="font-medium text-gray-900">
                                            KES {investment.amountRaised.toLocaleString()} / {investment.amountRequested.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <Clock size={16} className="mr-2 text-gray-400" />
                                        {investment.duration}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <AlertTriangle size={16} className="mr-2 text-gray-400" />
                                        {investment.riskLevel} Risk
                                    </div>
                                </div>

                                <Button className="w-full" variant="outline">View Details</Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
