import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Building2, Upload, AlertCircle } from 'lucide-react';

export const BusinessRegistration: React.FC = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        category: '',
        registrationNumber: '',
        fundingAmount: '',
        businessPlan: null as File | null,
        useOfFunds: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('🚀 Feature Launching Soon!\n\nBusiness registration will be available in the next version. We\'re working hard to bring you this feature!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Building2 className="text-primary" size={32} />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Register Your Business</h1>
                    <p className="text-gray-600">Apply for funding through our P2P lending platform</p>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-yellow-900 mb-1">Preview Mode</h3>
                    <p className="text-sm text-yellow-800">
                        This is a preview of the business registration form. The submission functionality will be available in the next version of the platform.
                    </p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Name *
                            </label>
                            <input
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., Mama Njeri's Grocery"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Category *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            >
                                <option value="">Select category</option>
                                <option value="retail">Retail</option>
                                <option value="agriculture">Agriculture</option>
                                <option value="transportation">Transportation</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="services">Services</option>
                                <option value="technology">Technology</option>
                                <option value="food-beverage">Food & Beverage</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Registration Number
                            </label>
                            <input
                                type="text"
                                value={formData.registrationNumber}
                                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Optional"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Funding Amount Needed (KES) *
                            </label>
                            <input
                                type="number"
                                value={formData.fundingAmount}
                                onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., 50000"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Use of Funds *
                        </label>
                        <textarea
                            value={formData.useOfFunds}
                            onChange={(e) => setFormData({ ...formData, useOfFunds: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={4}
                            placeholder="Describe how you will use the funds (e.g., Purchase inventory, buy equipment, expand operations)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Plan / Proposal
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 mb-2">Upload your business plan (PDF, DOC)</p>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFormData({ ...formData, businessPlan: e.target.files?.[0] || null })}
                                className="text-sm text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <Button type="submit" className="w-full md:w-auto">
                            Submit Application
                        </Button>
                        <p className="text-sm text-gray-500 mt-3">
                            * Required fields. Your application will be reviewed within 3-5 business days.
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
};
