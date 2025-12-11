"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import ImageUpload from '@/components/ImageUpload';

export default function AdminProfileEditor() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/portfolio/profile');
                if (res.data) setProfile(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.put('/portfolio/profile', profile);
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            setMessage('Error saving profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Edit Portfolio Profile</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-6 max-w-4xl">
                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-xl font-bold text-brand-text mb-4">Basic Info</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-md font-medium text-brand-text mb-2">Name</label>
                            <input
                                type="text"
                                value={profile.name || ''}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-brand-text"
                            />
                        </div>
                        <div>
                            <ImageUpload
                                label="Hero Image / Profile Image"
                                currentImage={profile.heroImage}
                                onUpload={(url) => setProfile({ ...profile, heroImage: url })}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-xl font-bold text-brand-text mb-4">Hero Summary</label>
                    <textarea
                        value={profile.summaryHero || ''}
                        onChange={(e) => setProfile({ ...profile, summaryHero: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red"
                    ></textarea>
                </div>

                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-xl font-bold text-brand-text mb-4">Experience Text</label>
                    <textarea
                        value={profile.experienceText || ''}
                        onChange={(e) => setProfile({ ...profile, experienceText: e.target.value })}
                        rows="6"
                        className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red"
                    ></textarea>
                </div>

                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <label className="block text-xl font-bold text-brand-text mb-4">Design Philosophy</label>
                    <textarea
                        value={profile.philosophyText || ''}
                        onChange={(e) => setProfile({ ...profile, philosophyText: e.target.value })}
                        rows="6"
                        className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:outline-none focus:border-brand-red"
                    ></textarea>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-all duration-300"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </div>
        </div>
    );
}
