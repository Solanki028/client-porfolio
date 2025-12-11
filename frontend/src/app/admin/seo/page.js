"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function AdminSeo() {
    const [pages, setPages] = useState(['home', 'about', 'contact', 'services']);
    const [selectedPage, setSelectedPage] = useState('home');
    const [seoData, setSeoData] = useState({ title: '', description: '', keywords: '' });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSeo(selectedPage);
    }, [selectedPage]);

    const fetchSeo = async (page) => {
        setLoading(true);
        try {
            const res = await api.get(`/seo/${page}`);
            if (res.data) {
                setSeoData({
                    title: res.data.title || '',
                    description: res.data.description || '',
                    keywords: res.data.keywords || ''
                });
            } else {
                setSeoData({ title: '', description: '', keywords: '' });
            }
        } catch (error) {
            // If 404, just reset
            setSeoData({ title: '', description: '', keywords: '' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.put(`/seo/${selectedPage}`, seoData);
            setMessage('SEO data updated!');
        } catch (error) {
            setMessage('Error updating SEO data.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Manage SEO Metadata</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar for pages */}
                <div className="w-full md:w-1/4 bg-brand-gray p-4 rounded-lg border border-brand-dark h-fit">
                    <h3 className="font-bold text-brand-text mb-4">Select Page</h3>
                    <ul className="space-y-2">
                        {pages.map(page => (
                            <li key={page}>
                                <button
                                    onClick={() => setSelectedPage(page)}
                                    className={`w-full text-left px-4 py-2 rounded ${selectedPage === page ? 'bg-brand-red text-white' : 'text-brand-text hover:bg-brand-dark'}`}
                                >
                                    {page.charAt(0).toUpperCase() + page.slice(1)}
                                </button>
                            </li>
                        ))}
                        {/* Add custom page input if needed */}
                    </ul>
                </div>

                {/* Form */}
                <div className="w-full md:w-3/4 bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <h2 className="text-xl font-bold text-brand-text mb-6">Editing: {selectedPage}</h2>

                    {message && (
                        <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                            {message}
                        </div>
                    )}

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={seoData.title}
                                    onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-1">Meta Description</label>
                                <textarea
                                    value={seoData.description}
                                    onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-1">Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    value={seoData.keywords}
                                    onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-brand-red text-white font-bold rounded hover:bg-red-800"
                            >
                                {saving ? 'Saving...' : 'Save SEO Data'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
