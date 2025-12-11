"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await api.get('/contact');
                setMessages(res.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Contact Messages</h1>

            {messages.length === 0 ? (
                <p className="text-brand-muted">No messages yet.</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-brand-text">{msg.name}</h3>
                                    <p className="text-sm text-brand-muted">{msg.email}</p>
                                </div>
                                <span className="text-xs text-brand-muted">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-brand-text bg-brand-dark p-4 rounded">
                                {msg.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
