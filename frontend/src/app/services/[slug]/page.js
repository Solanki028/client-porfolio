"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import Link from 'next/link';

export default function ServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const res = await api.get(`/services/${slug}`);
                setService(res.data.service);
                setItems(res.data.items);
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchServiceData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh] bg-brand-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh] bg-brand-black text-white">
                <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                <Link href="/services" className="text-brand-red hover:underline">Back to Services</Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-black min-h-screen text-white">
            {/* Split Hero Section */}
            <section className="flex flex-col md:flex-row min-h-[80vh]">
                {/* Left: Content */}
                <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-brand-dark relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-1 bg-brand-red"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-1 bg-brand-red"></div>

                    <nav className="flex items-center space-x-3 text-sm font-medium uppercase tracking-widest text-brand-muted mb-8 animate-fade-in-down">
                        <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
                        <span className="text-brand-red">/</span>
                        <Link href="/services" className="hover:text-brand-red transition-colors">Services</Link>
                        <span className="text-brand-red">/</span>
                        <span className="text-white border-b border-brand-red pb-0.5">{service.title}</span>
                    </nav>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
                        {service.title}
                    </h1>
                    <div className="prose prose-xl prose-invert text-gray-300 font-light leading-relaxed animate-fade-in-up delay-100">
                        {service.description}
                    </div>
                </div>

                {/* Right: Hero Image */}
                <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-auto">
                    {service.heroImage ? (
                        <img
                            src={service.heroImage}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                            <span className="text-8xl font-bold opacity-10">{service.title[0]}</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/50"></div>
                </div>
            </section>

            {/* Gallery Grid Section */}
            {items.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                            Selected Works
                            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-brand-red"></span>
                        </h2>
                        <p className="text-gray-400">A glimpse into our portfolio for {service.title}.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div key={item._id} className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-900 border border-gray-800 hover:border-brand-red transition-all duration-500">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title || 'Gallery Image'}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    {item.title && item.title !== 'Gallery Image' && (
                                        <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                                    )}
                                    {item.description && (
                                        <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">{item.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
