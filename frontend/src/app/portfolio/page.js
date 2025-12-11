import ProfileClient from '@/components/ProfileClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    // We can use a custom 'portfolio' type in the SEO system if we want, or defaults
    // For now, let's assume 'portfolio' key in SEO system
    return await getPageSeo('portfolio') || {
        title: 'Portfolio - Designer Profile',
        description: 'Professional Designer Portfolio'
    };
}

export default function PortfolioPage() {
    return (
        <main>
            <ProfileClient />
        </main>
    );
}
