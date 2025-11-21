import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

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
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="card-white h-80 animate-pulse bg-gray-100"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Clean Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Investment Opportunities</h1>
                    <p className="text-grey">Browse vetted small businesses in Kenya looking for capital</p>
                </div>
            </div>

            {/* Investments Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {investments.map((investment) => {
                        const progress = (investment.amountRaised / investment.amountRequested) * 100;

                        return (
                            <div key={investment.id} className="card-white group cursor-pointer">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="badge-blue text-xs">{investment.category}</span>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                        <TrendingUp size={16} strokeWidth={2} />
                                        {investment.returnRate}%
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-electric-blue transition-colors">
                                    {investment.title}
                                </h3>
                                <p className="text-grey text-sm mb-6 line-clamp-2">{investment.description}</p>

                                {/* Progress */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-grey">Raised</span>
                                        <span className="font-semibold text-black">
                                            KES {investment.amountRaised.toLocaleString()} / {investment.amountRequested.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-grey">
                                        <Clock size={16} strokeWidth={1.5} />
                                        {investment.duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-grey">
                                        <AlertTriangle size={16} strokeWidth={1.5} />
                                        {investment.riskLevel} Risk
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="w-full btn-pill-secondary flex items-center justify-center gap-2 group-hover:bg-electric-blue group-hover:text-white transition-all">
                                    View Details
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
