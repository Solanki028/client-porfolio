"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';

export default function ServiceDetailClient() {
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
                console.error('Error fetching service details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchServiceData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex justify-center items-center h-[80vh] text-brand-text">
                Service not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-brand-gray py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-brand-red mb-6 animate-fade-in-up">
                        {service.title}
                    </h1>
                    <p className="text-xl text-brand-muted max-w-3xl mx-auto">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-brand-text mb-8 border-l-4 border-brand-red pl-4">
                    Selected Works
                </h2>

                {items.length === 0 ? (
                    <p className="text-brand-muted italic">No portfolio items added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div key={item._id} className="group relative bg-brand-dark rounded-lg overflow-hidden">
                                <div className="aspect-w-16 aspect-h-12 bg-gray-800">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tools && item.tools.map((tool, idx) => (
                                            <span key={idx} className="text-xs bg-brand-red px-2 py-1 rounded text-white">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
