import TestimonialsClient from '@/components/TestimonialsClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    return await getPageSeo('testimonials');
}

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen bg-brand-black pt-20">
            <TestimonialsClient />
        </main>
    );
}
