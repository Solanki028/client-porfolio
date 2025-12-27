"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import ImageUpload from '@/components/ImageUpload';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function AdminAbout() {
    const [aboutUs, setAboutUs] = useState({ text: '', images: [] });
    const [homeHero, setHomeHero] = useState({
        tagline: '',
        description: '',
        heroImages: [] // Array of strings (URLs)
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usRes, heroRes] = await Promise.all([
                    api.get('/content/about_us'),
                    api.get('/content/home_hero')
                ]);

                if (usRes.data && usRes.data.content) {
                    if (typeof usRes.data.content === 'string') {
                        const existingData = usRes.data.content;
                        // Migration logic: If old 'image' exists and no 'images' array, migrate it
                        if (existingData.image && (!existingData.images || existingData.images.length === 0)) {
                            existingData.images = [existingData.image];
                        }
                        if (!existingData.images) existingData.images = [];
                        setAboutUs(existingData);
                    }
                }

                if (heroRes.data && heroRes.data.content) {
                    const data = heroRes.data.content;
                    // Migration: If old heroImage exists but no heroImages array, create one
                    if (data.heroImage && (!data.heroImages || data.heroImages.length === 0)) {
                        data.heroImages = [data.heroImage];
                    }
                    if (!data.heroImages) data.heroImages = [];
                    setHomeHero(data);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            // Filter out empty image strings before saving
            const cleanedAboutUs = {
                ...aboutUs,
                images: aboutUs.images.filter(img => img && img.trim() !== '')
            };

            const cleanedHomeHero = {
                ...homeHero,
                heroImages: homeHero.heroImages.filter(img => img && img.trim() !== '')
            };

            await Promise.all([
                api.put('/content/about_us', { content: cleanedAboutUs }),
                api.put('/content/home_hero', { content: cleanedHomeHero })
            ]);
            setMessage('Content updated successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
            setMessage('Error saving content.');
        } finally {
            setSaving(false);
        }
    };

    const handleAddSlide = () => {
        if (homeHero.heroImages.length < 5) {
            setHomeHero({ ...homeHero, heroImages: [...homeHero.heroImages, ''] });
        }
    };

    const handleRemoveSlide = (index) => {
        const newImages = [...homeHero.heroImages];
        newImages.splice(index, 1);
        setHomeHero({ ...homeHero, heroImages: newImages });
    };

    const handleImageUpdate = (index, url) => {
        const newImages = [...homeHero.heroImages];
        newImages[index] = url;
        setHomeHero({ ...homeHero, heroImages: newImages });
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Edit Content</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-8 max-w-5xl">
                {/* HERO SECTION EDIT */}
                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-2xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2">Home Page Hero</label>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-md font-medium text-brand-text mb-2">Tagline (Big Header)</label>
                            <input
                                type="text"
                                value={homeHero.tagline || ''}
                                onChange={(e) => setHomeHero({ ...homeHero, tagline: e.target.value })}
                                className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text font-bold text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-medium text-brand-text mb-2">Description (Sub-text)</label>
                            <textarea
                                value={homeHero.description || ''}
                                onChange={(e) => setHomeHero({ ...homeHero, description: e.target.value })}
                                rows="3"
                                className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text"
                            ></textarea>
                        </div>

                        {/* CAROUSEL IMAGES */}
                        <div>
                            <label className="block text-md font-medium text-brand-text mb-4">
                                Carousel Images (Max 5)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {homeHero.heroImages && homeHero.heroImages.map((img, index) => (
                                    <div key={index} className="relative p-4 border border-brand-dark rounded bg-black/20">
                                        <div className="absolute top-2 right-2 z-10">
                                            <button
                                                onClick={() => handleRemoveSlide(index)}
                                                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-700 transition-colors"
                                                title="Remove Slide"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                        <div className="mb-2 text-sm text-brand-muted">Slide {index + 1}</div>
                                        <ImageUpload
                                            label=""
                                            currentImage={img}
                                            onUpload={(url) => handleImageUpdate(index, url)}
                                        />
                                    </div>
                                ))}

                                {(!homeHero.heroImages || homeHero.heroImages.length < 5) && (
                                    <button
                                        onClick={handleAddSlide}
                                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded hover:border-brand-red hover:bg-brand-red/5 transition-all h-full min-h-[200px]"
                                    >
                                        <FaPlus className="text-3xl text-gray-500 mb-2 group-hover:text-brand-red" />
                                        <span className="text-gray-400">Add Slide Image</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ABOUT US EDIT */}
                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-2xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2">About Us Page</label>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-md font-medium text-brand-text mb-2">Main Content</label>
                            <textarea
                                value={aboutUs.text}
                                onChange={(e) => setAboutUs({ ...aboutUs, text: e.target.value })}
                                rows="10"
                                className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red"
                                placeholder="Enter About Us content (HTML supported)..."
                            ></textarea>
                            <p className="text-sm text-brand-muted mt-2">Supports HTML tags.</p>
                        </div>
                        <div>
                            <div>
                                <label className="block text-md font-medium text-brand-text mb-4">
                                    Carousel Images (Max 5)
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {aboutUs.images && aboutUs.images.map((img, index) => (
                                        <div key={index} className="relative p-4 border border-brand-dark rounded bg-black/20">
                                            <div className="absolute top-2 right-2 z-10">
                                                <button
                                                    onClick={() => {
                                                        const newImages = [...aboutUs.images];
                                                        newImages.splice(index, 1);
                                                        setAboutUs({ ...aboutUs, images: newImages });
                                                    }}
                                                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-700 transition-colors"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                            <div className="mb-2 text-sm text-brand-muted">Slide {index + 1}</div>
                                            <ImageUpload
                                                label=""
                                                currentImage={img}
                                                onUpload={(url) => {
                                                    const newImages = [...aboutUs.images];
                                                    newImages[index] = url;
                                                    setAboutUs({ ...aboutUs, images: newImages });
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {(!aboutUs.images || aboutUs.images.length < 5) && (
                                        <button
                                            onClick={() => setAboutUs({ ...aboutUs, images: [...aboutUs.images, ''] })}
                                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded hover:border-brand-red hover:bg-brand-red/5 transition-all h-full min-h-[200px]"
                                        >
                                            <FaPlus className="text-3xl text-gray-500 mb-2 group-hover:text-brand-red" />
                                            <span className="text-gray-400">Add Slide Image</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-10 py-4 rounded font-bold text-white text-lg transition-all duration-300 ${saving
                        ? 'bg-brand-red/50 cursor-not-allowed'
                        : 'bg-brand-red hover:bg-red-800 hover:shadow-lg hover:shadow-brand-red/20'
                        }`}
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
}
