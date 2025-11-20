import React from 'react';
import { Link } from 'react-router-dom';

export const TermsAndConditions: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>

            <div className="prose max-w-none text-gray-700 space-y-6">
                <p className="text-sm text-gray-500">Last Updated: November 20, 2025</p>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Wealth Builder Kenya ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Use of Platform</h2>
                    <p>
                        Wealth Builder Kenya provides financial literacy education and previews of peer-to-peer lending opportunities. The Platform is intended for educational purposes and to showcase future investment features.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>You must be at least 18 years old to use this Platform</li>
                        <li>You are responsible for maintaining the confidentiality of your account</li>
                        <li>You agree to provide accurate and complete information during registration</li>
                        <li>You will not use the Platform for any illegal or unauthorized purpose</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Educational Content</h2>
                    <p>
                        The learning modules and financial information provided on this Platform are for educational purposes only and should not be considered as financial advice. Always consult with a qualified financial advisor before making investment decisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Investment Preview Features</h2>
                    <p>
                        The peer-to-peer lending marketplace currently displays dummy data for preview purposes only. No actual investment transactions can be made at this time. Future versions will include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Real business listings and investment opportunities</li>
                        <li>Payment processing capabilities</li>
                        <li>KYC (Know Your Customer) verification</li>
                        <li>Regulatory compliance features</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. User Data and Privacy</h2>
                    <p>
                        Your privacy is important to us. Please review our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
                    <p>
                        All content on this Platform, including text, graphics, logos, and software, is the property of Wealth Builder Kenya and is protected by copyright and intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
                    <p>
                        Wealth Builder Kenya shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Platform or for the cost of procurement of substitute goods and services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with the laws of the Republic of Kenya, without regard to its conflict of law provisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <p className="font-medium">
                        Email: support@wealthbuilderkenya.com<br />
                        Address: Nairobi, Kenya
                    </p>
                </section>

                <div className="border-t border-gray-200 pt-6 mt-8">
                    <Link to="/" className="text-primary hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
