"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import AboutClient from './AboutClient';
import { FaWhatsapp } from 'react-icons/fa';

export default function HomeClient() {
    const [heroContent, setHeroContent] = useState({
        tagline: 'Creative Design Studio',
        description: 'We craft unique visual experiences.',
        heroImages: []
    });
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [whatsappNumber, setWhatsappNumber] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroRes, servicesRes, settingsRes] = await Promise.all([
                    api.get('/content/home_hero'),
                    api.get('/services'),
                    api.get('/content/footer_settings')
                ]);

                if (heroRes.data && heroRes.data.content) {
                    const data = { ...heroRes.data.content };
                    // Backward compatibility
                    if (data.heroImage && (!data.heroImages || data.heroImages.length === 0)) {
                        data.heroImages = [data.heroImage];
                    }
                    if (!data.heroImages) data.heroImages = [];
                    setHeroContent(data);
                }

                if (servicesRes.data) {
                    setServices(servicesRes.data);
                }

                if (settingsRes?.data?.content?.phone) {
                    setWhatsappNumber(settingsRes.data.content.phone.replace(/[^0-9]/g, ''));
                }
            } catch (error) {
                console.error('Error fetching home content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Carousel Logic
    useEffect(() => {
        if (heroContent.heroImages && heroContent.heroImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroContent.heroImages.length);
            }, 4000); // 4 Seconds
            return () => clearInterval(interval);
        }
    }, [heroContent.heroImages]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            {/* HER HERO SECTION */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    {heroContent.heroImages && heroContent.heroImages.length > 0 ? (
                        heroContent.heroImages.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Hero Background ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-full bg-brand-black"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-left animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            <span className="text-brand-red">JK Designs</span> <br />
                            {heroContent.tagline}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                            {heroContent.description}
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                href="/services"
                                className="px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-brand-red/50 transform hover:-translate-y-1 text-center"
                            >
                                View Services
                            </Link>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 border-2 border-[#25D366] text-[#25D366] font-bold rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-300 text-center flex items-center justify-center space-x-2"
                            >
                                <FaWhatsapp className="text-xl" />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Hero Indicators */}
                {heroContent.heroImages && heroContent.heroImages.length > 1 && (
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                        {heroContent.heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide ? 'w-12 bg-brand-red' : 'w-6 bg-white/30 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ABOUT US SECTION */}
            <section className="bg-brand-black border-b border-gray-900">
                <AboutClient />
            </section>

            {/* SERVICES PREVIEW SECTION */}
            <section className="py-24 px-4 bg-brand-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
                            Our Services
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We offer a comprehensive suite of creative solutions to elevate your brand identity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 3).map((service) => (
                            <Link
                                href={`/services/${service.slug}`}
                                key={service._id}
                                className="group bg-brand-gray rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-red transition-all duration-300 hover:shadow-2xl hover:shadow-brand-red/10 flex flex-col"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    {service.heroImage ? (
                                        <img
                                            src={service.heroImage}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-brand-muted">
                                            <span className="text-5xl font-bold opacity-30">{service.title[0]}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors">{service.title}</h3>
                                    <p className="text-brand-muted line-clamp-3 mb-6">
                                        {service.description}
                                    </p>
                                    <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Explore &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/services"
                            className="inline-block px-8 py-3 border border-gray-600 text-gray-300 rounded hover:border-brand-red hover:text-brand-red transition-all duration-300"
                        >
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
