import api from './api';

export async function getPageSeo(pageIdentifier) {
    try {
        const res = await api.get(`/seo/${encodeURIComponent(pageIdentifier)}`);
        if (res.data) {
            return {
                title: res.data.title,
                description: res.data.description,
                keywords: res.data.keywords,
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Page SEO not found, return null to use default
            return null;
        }
        console.error(`Error fetching SEO for ${pageIdentifier}:`, error.message);
    }

    return null;
}
