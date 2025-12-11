"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function TestimonialsClient() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await api.get('/testimonials');
                setTestimonials(res.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
                    Client Testimonials
                    <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-red"></span>
                </h1>
                <p className="text-brand-muted text-lg max-w-2xl mx-auto mt-6">
                    See what our clients have to say about their experience working with us.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial._id}
                        className="bg-brand-gray p-8 rounded-2xl border border-gray-800 hover:border-brand-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-red/10 group relative"
                    >
                        <FaQuoteLeft className="text-4xl text-brand-red/20 absolute top-8 right-8 group-hover:text-brand-red/40 transition-colors" />

                        <div className="flex items-center mb-6">
                            {testimonial.avatar ? (
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-red mr-4"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center border-2 border-brand-red mr-4">
                                    <span className="text-xl font-bold text-white">{testimonial.name[0]}</span>
                                </div>
                            )}
                            <div>
                                <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                                <p className="text-brand-red text-sm font-medium">{testimonial.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-300 italic mb-6 leading-relaxed">
                            "{testimonial.quote}"
                        </p>

                        <div className="flex text-yellow-500">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <FaStar key={i} className="mr-1" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
