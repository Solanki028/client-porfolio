"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';

export default function ServicesClient() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-brand-red text-white py-16 px-4 rounded-2xl mb-16 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Services</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light">
                        We provide a wide range of creative design solutions tailored to your brand.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service) => (
                    <Link
                        href={`/services/${service.slug}`}
                        key={service._id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col cursor-pointer"
                    >
                        <div className="h-64 overflow-hidden relative bg-gray-200">
                            {service.heroImage ? (
                                <img
                                    src={service.heroImage}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand-dark text-brand-muted">
                                    <span className="text-6xl opacity-20 font-bold">{service.title[0]}</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white tracking-wide drop-shadow-md">
                                {service.title}
                            </h2>
                        </div>

                        <div className="p-8 flex-grow flex flex-col justify-between bg-white">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {service.description}
                            </p>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <span className="text-brand-red font-semibold text-sm uppercase tracking-wider group-hover:underline">
                                    Learn More
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
