export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark">
                    <h3 className="text-xl font-bold text-brand-text mb-2">Welcome Back</h3>
                    <p className="text-brand-muted">Manage your portfolio content from here.</p>
                </div>
                {/* Add stats or quick links here */}
            </div>
        </div>
    );
}
