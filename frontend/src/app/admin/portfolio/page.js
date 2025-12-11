export default function AdminPortfolio() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Portfolio Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <a href="/admin/portfolio/profile" className="block bg-brand-gray p-8 rounded-xl border border-brand-dark hover:border-brand-red transition-all group">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-red">Edit Profile</h2>
                    <p className="text-brand-muted">Update bio, experience, and philosophy text.</p>
                </a>
                <a href="/admin/portfolio/expertise" className="block bg-brand-gray p-8 rounded-xl border border-brand-dark hover:border-brand-red transition-all group">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-red">Manage Expertise</h2>
                    <p className="text-brand-muted">Add, edit, or remove expertise grid items.</p>
                </a>
            </div>
        </div>
    );
}
