import ServicesClient from '@/components/ServicesClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('services');
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'Services | Designer Portfolio',
        description: 'Explore our range of design services.',
    };
}

export default function Services() {
    return <ServicesClient />;
}
