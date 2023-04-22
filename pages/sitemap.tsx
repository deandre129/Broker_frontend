import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';
import { AuthToken } from '@/modules/auth/authToken';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';

const Sitemap = ({ testimonials, navigation, broker, forexSchool, forexStrategy, blog, }) => {
    const site_url = config.frontendUrl.protocol+"://"+config.frontendUrl.host;

    const homeUrl = 
        `<url>
            <loc>${site_url}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>`;

    const brokerCompareUrl = 
        `<url>
            <loc>${site_url}/forex-cfd-broker-vergleich</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>`;
        
    const blogUrl = 
        `<url>
            <loc>${site_url}/blog</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>`;

    const testimonialsUrls = testimonials.rows.map((item) => {
        return `
            <url>
                <loc>${site_url}/erfahrungsberichte/${item.name_normalized}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
      }).join('\r\n');

    const brokerUrls = broker.rows.map((item) => {
        return `
            <url>
                <loc>${site_url}${item.link}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    }).join('\r\n');

    const forexSchoolUrls = forexSchool.rows.map((item) => {
        return `
            <url>
                <loc>${site_url}${item.link}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    }).join('\r\n');

    const forexStrategyUrls = forexStrategy.rows.map((item) => {
        return `
            <url>
                <loc>${site_url}${item.link}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    }).join('\r\n');

    const blogUrls = blog.rows.map((item) => {
        return `
            <url>
                <loc>${site_url}/blog/${item.name_normalized}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
      }).join('\r\n');

    const downloadUrls = navigation[4].children.map((item) => {
        return `
            <url>
                <loc>${site_url}${item.route}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `;
      }).join('\r\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${homeUrl}
        ${brokerCompareUrl}
        ${blogUrl}
        ${testimonialsUrls}
        ${brokerUrls}
        ${forexSchoolUrls}
        ${forexStrategyUrls}
        ${blogUrls}
        ${downloadUrls}
    </urlset>
    `;

    return xml;
}

export async function getServerSideProps() {
    const sortField = 'name';
    const sortOrder = "asc";

    const filter = {
        activated: true,
        category: 0
    }

    const params = {
        filter: filter,
        orderBy: sortField+"_"+sortOrder,
        limit: null,
        offset: 1,
    }

    const [
        baseRes,
        testimonialsRes,
        blogRes
    ] = await Promise.all([
        axios.get(`${config.backendUrl}/base`),
        axios.get(`${config.backendUrl}/broker`, {params}),
        axios.get(`${config.backendUrl}/blog`, { params: { limit: 10, offset: 0 } }),
    ])
    const testimonials = testimonialsRes.data;
    const broker = baseRes.data.categorySidebar;
    const forexSchool = baseRes.data.forexSchool;
    const forexStrategy = baseRes.data.forexStrategy;
    const navigation = baseRes.data.navigation;
    const blog  = blogRes.data;

    return { props: { testimonials, broker, forexSchool, forexStrategy, navigation, blog } };
} ;
  
export default Sitemap;