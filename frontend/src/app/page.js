import HomeClient from '@/components/HomeClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
  const seo = await getPageSeo('home');
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    };
  }
  return {
    title: 'Home | Designer Portfolio',
    description: 'Welcome to our creative design studio.',
  };
}

export default function Home() {
  return <HomeClient />;
}
