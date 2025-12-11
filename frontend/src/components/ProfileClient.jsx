"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaExternalLinkAlt, FaQuoteLeft } from 'react-icons/fa';

export default function ProfileClient() {
    const [profile, setProfile] = useState(null);
    const [expertise, setExpertise] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, expertiseRes] = await Promise.all([
                    api.get('/portfolio/profile'),
                    api.get('/portfolio/expertise')
                ]);
                setProfile(profileRes.data);
                setExpertise(expertiseRes.data);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="bg-brand-black min-h-screen text-brand-text">
            {/* Hero / Header */}
            <section className="relative py-24 px-4 overflow-hidden border-b border-gray-900">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
                        {profile.name}
                    </h1>
                    <p className="text-2xl text-brand-red font-medium mb-8 animate-fade-in-up delay-100">
                        {profile.role}
                    </p>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        {profile.summaryHero}
                    </p>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[100px]"></div>
                </div>
            </section>

            {/* Experience & Industries */}
            <section className="py-20 px-4 bg-brand-dark">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1 border-l-4 border-brand-red pl-6">
                        <h2 className="text-3xl font-bold text-white">15+ Years</h2>
                        <p className="text-brand-muted">of Industry Experience</p>
                    </div>
                    <div className="md:col-span-2">
                        <div className="prose prose-lg prose-invert text-gray-300">
                            <p className="whitespace-pre-line leading-relaxed">{profile.experienceText}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Areas of Expertise</h2>
                        <div className="w-20 h-1 bg-brand-red mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {expertise.map((item) => (
                            <div key={item._id} className="bg-brand-gray border border-gray-800 rounded-xl p-8 hover:border-brand-red transition-all duration-300 group hover:shadow-2xl hover:shadow-brand-red/10 flex flex-col h-full relative overflow-hidden">
                                {item.imageUrl && (
                                    <div className="mb-6 h-48 overflow-hidden rounded-lg">
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-red transition-colors">{item.title}</h3>
                                    {item.linkUrl && item.linkUrl !== '#' && (
                                        <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-white transition-colors">
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Approach / Philosophy */}
            <section className="py-24 px-4 bg-brand-dark border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <FaQuoteLeft className="text-4xl text-brand-red mx-auto mb-8 opacity-50" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Design Philosophy</h2>
                    <div className="prose prose-xl prose-invert mx-auto text-gray-300">
                        <p className="whitespace-pre-line">{profile.philosophyText}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
