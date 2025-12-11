import ContactClient from '@/components/ContactClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('contact');
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'Contact Us | Designer Portfolio',
        description: 'Get in touch with us for your design needs.',
    };
}

export default function Contact() {
    return <ContactClient />;
}
