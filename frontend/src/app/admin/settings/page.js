"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { FaCog, FaLock, FaSave } from 'react-icons/fa';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // General Settings State (Footer)
    const [settings, setSettings] = useState({
        servicesText: '',
        email: '',
        phone: '',
        address: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    });

    // Security Settings State
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Fetch User Info
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserEmail(user.email);
        }

        // Fetch Footer Settings
        const fetchSettings = async () => {
            try {
                const res = await api.get('/content/footer_settings');
                if (res.data && res.data.content) {
                    setSettings(prev => ({ ...prev, ...res.data.content }));
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveGeneral = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await api.put('/content/footer_settings', { content: settings });
            setMessage('Settings saved successfully!');
        } catch (err) {
            setError('Failed to save settings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        if (passwords.newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await api.put('/auth/change-password', {
                email: userEmail,
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword
            });
            setMessage('Password changed successfully!');
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Settings</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8 border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${activeTab === 'general'
                        ? 'text-brand-red border-b-2 border-brand-red'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <FaCog /> <span>General</span>
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${activeTab === 'security'
                        ? 'text-brand-red border-b-2 border-brand-red'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <FaLock /> <span>Security</span>
                </button>
            </div>

            {/* Check Messages */}
            {message && <div className="bg-green-500/10 text-green-500 p-4 rounded mb-6 border border-green-500/20">{message}</div>}
            {error && <div className="bg-red-500/10 text-red-500 p-4 rounded mb-6 border border-red-500/20">{error}</div>}

            {/* General Settings Tab */}
            {activeTab === 'general' && (
                <div className="bg-brand-gray p-8 rounded-lg border border-brand-dark max-w-4xl">
                    <h2 className="text-xl font-bold text-white mb-6">Footer Content</h2>
                    <form onSubmit={handleSaveGeneral} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-brand-text mb-2">Services List (One per line)</label>
                                <textarea
                                    value={settings.servicesText}
                                    onChange={(e) => setSettings({ ...settings, servicesText: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none h-32"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">WhatsApp Number</label>
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-brand-text mb-2">Address</label>
                                <input
                                    type="text"
                                    value={settings.address}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Social Media Links</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Facebook URL</label>
                                <input
                                    type="text"
                                    value={settings.facebook}
                                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Twitter/X URL</label>
                                <input
                                    type="text"
                                    value={settings.twitter}
                                    onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Instagram URL</label>
                                <input
                                    type="text"
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">LinkedIn URL</label>
                                <input
                                    type="text"
                                    value={settings.linkedin}
                                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors flex items-center ${loading ? 'opacity-50' : ''}`}
                            >
                                <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save General Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
                <div className="bg-brand-gray p-8 rounded-lg border border-brand-dark max-w-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-2">Old Password</label>
                            <input
                                type="password"
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text focus:border-brand-red outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                    <div className="mt-8 text-brand-muted text-sm border-t border-gray-700 pt-4">
                        <p>Logged in as: <span className="text-white">{userEmail}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}
