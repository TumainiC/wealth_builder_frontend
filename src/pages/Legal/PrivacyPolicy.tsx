import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

            <div className="prose max-w-none text-gray-700 space-y-6">
                <p className="text-sm text-gray-500">Last Updated: November 20, 2025</p>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                    <p>
                        Wealth Builder Kenya ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Personal Information</h3>
                    <p>When you register for an account, we collect:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Email address</li>
                        <li>Password (encrypted)</li>
                        <li>Financial literacy level</li>
                        <li>Primary investment goals</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Usage Information</h3>
                    <p>We automatically collect information about your interaction with the Platform:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Learning modules accessed and completed</li>
                        <li>Quiz scores and responses</li>
                        <li>Progress tracking data</li>
                        <li>Login times and session duration</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Technical Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Operating system</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                    <p>We use the collected information for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide and maintain our educational services</li>
                        <li>To personalize your learning experience</li>
                        <li>To track your progress and achievements</li>
                        <li>To improve our Platform and develop new features</li>
                        <li>To communicate with you about updates and new content</li>
                        <li>To ensure security and prevent fraud</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
                    <p>
                        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
                        <li><strong>Service providers:</strong> With trusted third-party service providers who assist in operating our Platform (e.g., hosting, analytics)</li>
                        <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                        <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational security measures to protect your personal information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption of sensitive data (passwords, personal information)</li>
                        <li>Secure HTTPS connections</li>
                        <li>Regular security assessments</li>
                        <li>Access controls and authentication</li>
                        <li>Regular backups and disaster recovery procedures</li>
                    </ul>
                    <p className="mt-3">
                        However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Your Rights and Choices</h2>
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Access:</strong> Request a copy of your personal data</li>
                        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                        <li><strong>Data portability:</strong> Request your data in a portable format</li>
                    </ul>
                    <p className="mt-3">
                        To exercise these rights, please contact us at privacy@wealthbuilderkenya.com
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar tracking technologies to enhance your experience:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential cookies:</strong> Required for Platform functionality</li>
                        <li><strong>Analytics cookies:</strong> Help us understand how users interact with the Platform</li>
                        <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                    <p className="mt-3">
                        You can control cookies through your browser settings, but disabling them may affect Platform functionality.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
                    <p>
                        Our Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete such information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Data Retention</h2>
                    <p>
                        We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in countries other than Kenya. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <p className="font-medium mt-3">
                        Email: privacy@wealthbuilderkenya.com<br />
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
