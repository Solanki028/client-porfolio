"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function AboutClient() {
    const [aboutUs, setAboutUs] = useState({ text: '', image: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usRes = await api.get('/content/about_us');
                if (usRes.data && usRes.data.content) {
                    if (typeof usRes.data.content === 'string') {
                        setAboutUs({ text: usRes.data.content, image: '' });
                    } else {
                        setAboutUs(usRes.data.content);
                    }
                }
            } catch (error) {
                console.error('Error fetching about content:', error);
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

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 min-h-[80vh] flex items-center">
            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                {/* Text Content */}
                <div className="order-2 md:order-1">
                    <div className="mb-10">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 relative inline-block">
                            About Us
                            <span className="absolute bottom-1 left-0 w-1/3 h-1.5 bg-brand-red"></span>
                        </h1>
                    </div>

                    <div className="prose prose-xl prose-invert text-gray-300 leading-relaxed font-light">
                        <div dangerouslySetInnerHTML={{ __html: aboutUs.text || '<p>We are a passionate team of designers and developers dedicated to creating digital experiences that matter.</p>' }} />
                    </div>
                </div>

                {/* Image Content */}
                <div className="order-1 md:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-brand-dark group">
                    {aboutUs.image ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                            <img
                                src={aboutUs.image}
                                alt="About Us"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-brand-black flex items-center justify-center">
                            <span className="text-9xl opacity-10 font-bold text-white tracking-widest">STORY</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
