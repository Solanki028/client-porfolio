"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

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
        <footer className="bg-brand-red border-t border-brand-black/30 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="mb-4">
                            <img src="/LOGO JKDESIGNS.png" alt="JK Designs Logo" className="h-10 w-auto object-contain brightness-0 invert" />
                        </h2>
                        <p className="text-brand-muted text-sm leading-relaxed mb-6">
                            Crafting digital experiences that merge creativity with function. We help brands stand out in the noise.
                        </p>
                        <div className="flex space-x-4">
                            {settings.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white hover:bg-white hover:text-brand-red transition-colors duration-300">
                                    <FaFacebookF />
                                </a>
                            )}
                            {settings.twitter && (
                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white hover:bg-white hover:text-brand-red transition-colors duration-300">
                                    <FaTwitter />
                                </a>
                            )}
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white hover:bg-white hover:text-brand-red transition-colors duration-300">
                                    <FaInstagram />
                                </a>
                            )}
                            {settings.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white hover:bg-white hover:text-brand-red transition-colors duration-300">
                                    <FaLinkedinIn />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white hover:text-brand-black transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-white hover:text-brand-black transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-white hover:text-brand-black transition-colors">Services</Link></li>
                            <li><Link href="/testimonials" className="text-white hover:text-brand-black transition-colors">Testimonials</Link></li>
                            <li><Link href="/contact" className="text-white hover:text-brand-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {serviceList.slice(0, 6).map((service, index) => (
                                <li key={index}>
                                    <Link href="/services" className="text-white hover:text-brand-black transition-colors">
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
                        </h3>
                        <ul className="space-y-4 text-white">
                            {settings.address && (
                                <li className="flex items-start">
                                    <span className="text-white mr-3 mt-1">📍</span>
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings.email && (
                                <li className="flex items-center">
                                    <span className="text-white mr-3">📧</span>
                                    <a href={`mailto:${settings.email}`} className="hover:text-brand-black transition-colors">{settings.email}</a>
                                </li>
                            )}
                            {settings.phone && (
                                <li className="flex items-center">
                                    <a
                                        href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center group hover:text-brand-black transition-colors"
                                    >
                                        <FaWhatsapp className="text-white mr-3 text-xl group-hover:text-brand-black transition-colors" />
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brand-black/30 pt-8 mt-8 text-center md:flex md:justify-between md:items-center">
                    <p className="text-white/80 text-sm">
                        &copy; {new Date().getFullYear()} Brand Portfolio. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
                        <a href="#" className="text-white/80 hover:text-brand-black text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/80 hover:text-brand-black text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
