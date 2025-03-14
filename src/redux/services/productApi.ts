import { api } from './api'

export interface Product {
    id: number;
    title: string;
}

export interface ProductApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const ProductApi = api.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query<ProductApiResponse, { limit?: string, skip?: string }>({
            query: ({ limit, skip }) => {
                return {
                    url: `/products`,
                    method: 'GET',
                    params: { limit, skip, select: 'title' }
                }
            },
            providesTags: ['PRODUCT']
        }),

    }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = ProductApi;
