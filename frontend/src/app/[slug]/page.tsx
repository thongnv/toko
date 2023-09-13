import PageHeader from '@/app/components/PageHeader';
import { fetchAPI } from '@/app/utils/fetch-api';
import BlogList from '@/app/views/blog-list';

async function fetchProductBySlug(filter: string) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/products`;
        const urlParamsObject = {
            sort: { createdAt: 'desc' },
            filters: {
                url: filter,
            }
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export default async function ProductRoute({ params }: { params: { slug: string } }) {
    const filter = params.slug;
    const { data } = await fetchProductBySlug(filter);

    //TODO: CREATE A COMPONENT FOR THIS
    if (data.length === 0) return <div>Not Posts In this category</div>;
    console.log(data);
    // {
    //     id: 1,
    //     [0]     attributes: {
    //     [0]       name: 'Giày chạy bộ nam NIKE FREE RN 5.0 NEXT NATURE',
    //     [0]       description: 'Giày chạy bộ nam NIKE FREE RN 5.0 NEXT NATURE\nHang chinh hang',
    //     [0]       createdAt: '2023-08-29T00:15:50.998Z',
    //     [0]       updatedAt: '2023-09-12T23:01:24.698Z',
    //     [0]       publishedAt: '2023-08-29T00:33:56.076Z',
    //     [0]       url: 'giay-chay-bo-nam-nike-free-rn-5-0-next-nature'
    //     [0]     }
    //     [0]   }
    
    const { name, description } = data[0]?.attributes;

    return (
        <div>
            <PageHeader heading={name} text={description} />
            {/* <BlogList data={data} /> */}
        </div>
    );
}

export async function generateStaticParams() {
    return [];
}
