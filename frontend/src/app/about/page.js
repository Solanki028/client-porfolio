import AboutClient from '@/components/AboutClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('about');
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'About Us | Designer Portfolio',
        description: 'Learn more about our studio and experience.',
    };
}

export default function About() {
    return <AboutClient />;
}
