"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Simple auth check
        const auth = localStorage.getItem('adminAuth');
        if (!auth && pathname !== '/admin') {
            router.push('/admin');
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    if (pathname === '/admin') {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null;

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'About Content', path: '/admin/about' },
        { name: 'Services', path: '/admin/services' },
        { name: 'SEO Metadata', path: '/admin/seo' },
        { name: 'Messages', path: '/admin/messages' },
        { name: 'Settings', path: '/admin/settings' },
        { name: 'Portfolio', path: '/admin/portfolio' },
    ];

    return (
        <div className="flex min-h-screen bg-brand-dark text-brand-text">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-brand-gray hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-brand-red">CMS Admin</h2>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block px-6 py-3 hover:bg-brand-gray transition-colors ${pathname === item.path ? 'bg-brand-gray text-brand-red border-r-4 border-brand-red' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminAuth');
                            router.push('/admin');
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-brand-gray text-red-500 mt-8"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
