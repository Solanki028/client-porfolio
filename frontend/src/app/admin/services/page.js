"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', heroImage: '' });
    const [creating, setCreating] = useState(false);

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

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (slug) => {
        if (confirm('Are you sure you want to delete this service category? This will also delete all projects within it.')) {
            try {
                await api.delete(`/services/${slug}`);
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Failed to delete service');
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await api.post('/services', newService);
            setShowCreateModal(false);
            setNewService({ title: '', description: '', heroImage: '' });
            fetchServices();
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Failed to create service');
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-brand-red">Manage Services</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center space-x-2 bg-brand-red text-white px-4 py-2 rounded hover:bg-red-800 transition-colors"
                >
                    <FaPlus /> <span>Add New Service</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service._id}
                        className="relative bg-brand-gray p-6 rounded-lg border border-brand-dark hover:border-brand-red transition-all group"
                    >
                        <button
                            onClick={() => handleDelete(service.slug)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-10"
                            title="Delete Service"
                        >
                            <FaTrash />
                        </button>

                        <Link href={`/admin/services/${service.slug}`} className="block h-full">
                            <h2 className="text-xl font-bold text-brand-text mb-2 pr-8">{service.title}</h2>
                            <p className="text-brand-muted line-clamp-2 text-sm mb-4">{service.description}</p>
                            <span className="inline-block mt-auto text-brand-red text-sm font-semibold group-hover:underline">
                                Edit Content & Items &rarr;
                            </span>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
                    <div className="bg-brand-gray border border-brand-dark text-white p-8 rounded-xl max-w-lg w-full relative">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-brand-red">Add New Service</h2>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Title</label>
                                <input
                                    type="text"
                                    value={newService.title}
                                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Short Description</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <ImageUpload
                                    label="Hero Image"
                                    onUpload={(url) => setNewService({ ...newService, heroImage: url })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={creating}
                                className={`w-full py-3 mt-4 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${creating ? 'opacity-50' : ''}`}
                            >
                                {creating ? 'Creating...' : 'Create Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
