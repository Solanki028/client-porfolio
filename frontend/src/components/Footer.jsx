"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const [settings, setSettings] = useState({
        servicesText: "Logo & Brand Identity Design\nBook & Magazine Covers\nPackaging & Label Design\nSocial Media Creative Campaigns\nPosters, Banners, Advertisements\nPhoto Manipulation & Concept Art\nPrint + Digital Branding Solutions",
        email: "hello@brand.com",
        phone: "+91 98765 43210",
        address: "123 Creative Street, Design City, India 400001",
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/content/footer_settings');
                if (res.data && res.data.content) {
                    setSettings(prev => ({ ...prev, ...res.data.content }));
                }
            } catch (error) {
                console.error('Error fetching footer settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const serviceList = settings.servicesText.split('\n').filter(s => s.trim() !== '');

    return (
        <footer className="bg-brand-black border-t border-brand-red/30 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            BRAND<span className="text-brand-red">.</span>
                        </h2>
                        <p className="text-brand-muted text-sm leading-relaxed mb-6">
                            Crafting digital experiences that merge creativity with function. We help brands stand out in the noise.
                        </p>
                        <div className="flex space-x-4">
                            {settings.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-brand-red transition-colors duration-300">
                                    <FaFacebookF />
                                </a>
                            )}
                            {settings.twitter && (
                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-brand-red transition-colors duration-300">
                                    <FaTwitter />
                                </a>
                            )}
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-brand-red transition-colors duration-300">
                                    <FaInstagram />
                                </a>
                            )}
                            {settings.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-brand-red transition-colors duration-300">
                                    <FaLinkedinIn />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-red"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-brand-muted hover:text-brand-red transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-brand-muted hover:text-brand-red transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-brand-muted hover:text-brand-red transition-colors">Services</Link></li>
                            <li><Link href="/testimonials" className="text-brand-muted hover:text-brand-red transition-colors">Testimonials</Link></li>
                            <li><Link href="/contact" className="text-brand-muted hover:text-brand-red transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Services
                            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-red"></span>
                        </h3>
                        <ul className="space-y-3">
                            {serviceList.slice(0, 6).map((service, index) => (
                                <li key={index}>
                                    <Link href="/services" className="text-brand-muted hover:text-brand-red transition-colors">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Get in Touch
                            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-red"></span>
                        </h3>
                        <ul className="space-y-4 text-brand-muted">
                            {settings.address && (
                                <li className="flex items-start">
                                    <span className="text-brand-red mr-3 mt-1">📍</span>
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings.email && (
                                <li className="flex items-center">
                                    <span className="text-brand-red mr-3">📧</span>
                                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
                                </li>
                            )}
                            {settings.phone && (
                                <li className="flex items-center">
                                    <span className="text-brand-red mr-3">📞</span>
                                    <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Brand Portfolio. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
