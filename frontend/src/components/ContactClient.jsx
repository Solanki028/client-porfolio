"use client";
import { useState } from 'react';
import api from '@/utils/api';

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await api.post('/contact', formData);
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-brand-red mb-8 text-center">Contact Us</h1>
            <p className="text-brand-muted text-center mb-12">
                Have a project in mind? We'd love to hear from you.
            </p>

            <div className="bg-brand-gray p-8 rounded-lg shadow-lg border border-brand-dark">
                {status.message && (
                    <div className={`mb-6 p-4 rounded ${status.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                            placeholder="Tell us about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-6 rounded font-bold text-white transition-all duration-300 ${loading
                                ? 'bg-brand-red/50 cursor-not-allowed'
                                : 'bg-brand-red hover:bg-red-800 hover:shadow-lg hover:shadow-brand-red/20'
                            }`}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
