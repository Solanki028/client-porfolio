"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.token) {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminUser', JSON.stringify(res.data)); // Store user info
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-black">
            <div className="w-full max-w-md p-8 bg-brand-dark rounded-lg shadow-lg border border-brand-gray">
                <h1 className="text-3xl font-bold text-brand-red mb-6 text-center">Admin Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Email / Username</label>
                        <input
                            type="text" // Allow text just in case, but usually email
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-brand-gray rounded text-brand-text focus:outline-none focus:border-brand-red"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-brand-gray rounded text-brand-text focus:outline-none focus:border-brand-red"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>
            </div>
        </div>
    );
}
