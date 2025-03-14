import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/`,
    prepareHeaders: (headers) => {
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

export const api = createApi({
    /**
     * `reducerPath` is optional and will not be required by most users.
     * This is useful if you have multiple API definitions,
     * e.g. where each has a different domain, with no interaction between endpoints.
     * Otherwise, a single API definition should be used in order to support tag invalidation,
     * among other features
     */
    reducerPath: 'splitApi',
    /**
     * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
     */
    baseQuery: baseQueryWithRetry,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: ['PRODUCT'],
    /**
     * This api has endpoints injected in adjacent files,
     * which is why no endpoints are shown below.
     * If you want all endpoints defined in the same file, they could be included here instead
     */
    endpoints: () => ({}),
})
