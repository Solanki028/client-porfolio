"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';

export default function AdminServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Gallery Add State
    const [newImageUrl, setNewImageUrl] = useState('');
    const [addingImage, setAddingImage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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

        if (slug) fetchData();
    }, [slug]);

    const handleServiceUpdate = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.put(`/services/${slug}`, service);
            setMessage('Service details updated!');
        } catch (error) {
            setMessage('Error updating service.');
        } finally {
            setSaving(false);
        }
    };

    const handleAddImage = async (e) => {
        e.preventDefault();
        if (!newImageUrl.trim()) return;

        setAddingImage(true);
        try {
            // We create a ServiceItem treating it as a gallery image
            // title is optional now, but we can set a default or leave empty
            const newItem = {
                title: 'Gallery Image',
                imageUrl: newImageUrl.trim(),
                description: '',
                year: '',
                tools: []
            };
            const res = await api.post(`/services/${slug}/items`, newItem);
            setItems([...items, res.data]);
            setNewImageUrl('');
            setMessage('Image added to gallery!');
        } catch (error) {
            console.error(error);
            setMessage('Error adding image.');
        } finally {
            setAddingImage(false);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!confirm('Are you sure you want to delete this image?')) return;
        try {
            await api.delete(`/services/items/${id}`);
            setItems(items.filter(item => item._id !== id));
            setMessage('Image deleted.');
        } catch (error) {
            setMessage('Error deleting image.');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!service) return <div className="p-8">Service not found.</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Edit Service: {service.title}</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {message}
                </div>
            )}

            {/* Edit Service Details */}
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark mb-8">
                <h2 className="text-xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2">Main Content</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Title</label>
                        <input
                            type="text"
                            value={service.title}
                            onChange={(e) => setService({ ...service, title: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Description</label>
                        <textarea
                            value={service.description}
                            onChange={(e) => setService({ ...service, description: e.target.value })}
                            rows="4"
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text"
                        ></textarea>
                    </div>
                    <div>
                        <ImageUpload
                            label="Hero Image"
                            currentImage={service.heroImage}
                            onUpload={(url) => setService({ ...service, heroImage: url })}
                        />
                    </div>
                    <button
                        onClick={handleServiceUpdate}
                        disabled={saving}
                        className={`w-full py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${saving ? 'opacity-50' : ''}`}
                    >
                        {saving ? 'Saving...' : 'Update Main Details'}
                    </button>
                </div>
            </div>

            {/* Gallery Management */}
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark mb-8">
                <h2 className="text-xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2 flex items-center">
                    <FaImage className="mr-2" /> Gallery Management
                </h2>

                {/* Add Image Form */}
                <div className="mb-8 p-4 bg-brand-dark rounded-lg">
                    <h3 className="text-sm font-medium text-brand-text mb-4">Add New Image</h3>
                    <div className="max-w-md">
                        <ImageUpload
                            label="Upload Gallery Image"
                            onUpload={async (url) => {
                                if (!url) return;
                                try {
                                    const newItem = {
                                        title: 'Gallery Image',
                                        imageUrl: url,
                                        description: '',
                                        year: '',
                                        tools: []
                                    };
                                    const res = await api.post(`/services/${slug}/items`, newItem);
                                    setItems([...items, res.data]);
                                    setMessage('Image added to gallery!');
                                } catch (error) {
                                    console.error(error);
                                    setMessage('Error adding image.');
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Gallery Grid */}
                {items.length === 0 ? (
                    <div className="text-center py-12 text-brand-muted bg-brand-dark rounded-lg border border-dashed border-gray-700">
                        No images in gallery yet. Add one above!
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <div key={item._id} className="relative group aspect-square bg-brand-dark rounded-lg overflow-hidden border border-gray-700">
                                <img src={item.imageUrl} alt="Gallery Item" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handleDeleteItem(item._id)}
                                        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
                                        title="Delete Image"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
