import { api } from './api'

export interface PRODUCT {
    id: number;
    title: string;
}

export interface ProductApiResponse {
    products: PRODUCT[];
    total: number;
    skip: number;
    limit: number;
}

export const ProductApi = api.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query<ProductApiResponse, { limit?: string, skip?: string, q?: string }>({
            query: ({ limit, skip, q }) => {
                return {
                    url: `/products/search`,
                    method: 'GET',
                    params: { limit, skip, q, select: 'title' }
                }
            },
            providesTags: ['PRODUCT']
        }),

    }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = ProductApi;
