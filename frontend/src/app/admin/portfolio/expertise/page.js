```
"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaTrash, FaPlus } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';

export default function AdminExpertise() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', linkUrl: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchItems = async () => {
        try {
            const res = await api.get('/portfolio/expertise');
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching expertise:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/ portfolio / expertise / ${ editingId } `, formData);
            } else {
                await api.post('/portfolio/expertise', formData);
            }
            fetchItems();
            setFormData({ title: '', description: '', imageUrl: '', linkUrl: '' });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, description: item.description, imageUrl: item.imageUrl, linkUrl: item.linkUrl });
        setEditingId(item._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/ portfolio / expertise / ${ id } `);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Manage Expertise</h1>

            {/* Form */}
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark mb-12">
                <h2 className="text-xl font-bold text-white mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                            required
                        />
                        <div className="md:col-span-2">
                            <ImageUpload
                                label="Expertise Image"
                                onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                                currentImage={formData.imageUrl}
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="External Link URL"
                        value={formData.linkUrl}
                        onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                        className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                        required
                    ></textarea>

                    <div className="flex space-x-4">
                        <button type="submit" className="px-6 py-2 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors">
                            {editingId ? 'Update Item' : 'Add Item'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setFormData({ title: '', description: '', imageUrl: '', linkUrl: '' }); setEditingId(null); }}
                                className="px-6 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                    <div key={item._id} className="bg-brand-gray p-6 rounded-lg border border-brand-dark flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-brand-muted">{item.description}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300">
                                <FaEdit size={20} />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300">
                                <FaTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
