"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function AboutClient() {
    const [aboutUs, setAboutUs] = useState({ text: '', images: [] });
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usRes = await api.get('/content/about_us');
                if (usRes.data && usRes.data.content) {
                    if (typeof usRes.data.content === 'string') {
                        setAboutUs({ text: usRes.data.content, images: [] });
                    } else {
                        // Create a shallow copy to avoid mutating strict mode props if applicable
                        const data = { ...usRes.data.content };

                        // Migration/Safety logic
                        if (data.image && (!data.images || data.images.length === 0)) {
                            data.images = [data.image];
                        }
                        if (!data.images) data.images = [];

                        // Filter out empty strings to prevent blank slides
                        data.images = data.images.filter(img => img && img.trim() !== '');

                        setAboutUs(data);
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

    // Carousel Logic
    useEffect(() => {
        if (aboutUs.images && aboutUs.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % aboutUs.images.length);
            }, 4000); // 4 Seconds
            return () => clearInterval(interval);
        }
    }, [aboutUs.images]);

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
                        </h1>
                    </div>

                    <div className="prose prose-xl prose-invert text-gray-300 leading-relaxed font-light">
                        <div dangerouslySetInnerHTML={{ __html: aboutUs.text || '<p>We are a passionate team of designers and developers dedicated to creating digital experiences that matter.</p>' }} />
                    </div>
                </div>

                {/* Image Content */}
                <div className="order-1 md:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-brand-dark group">
                    {aboutUs.images && aboutUs.images.length > 0 ? (
                        <div className="relative w-full h-full">
                            {aboutUs.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                                    <img
                                        src={img}
                                        alt={`About Us ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            ))}

                            {/* Indicators */}
                            {aboutUs.images.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                                    {aboutUs.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-brand-red' : 'w-2 bg-white/50 hover:bg-white'
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
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
