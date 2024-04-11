import { Post } from '../../../shared';
import { baseApi } from '../../../shared/api/baseApi';
import { Result } from '../model/types';

export const widgetsPostsListApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<Result, { limit: number; pageNumber: number }>({
            query: ({ limit = 0, pageNumber = 10 }) => ({
                url: `/posts?_limit=${limit}&_page=${pageNumber}`,
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.posts.push(...newItems.posts);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse: (rawResult: Post[], meta) => {
                const size = meta?.response?.headers.get('X-Total-Count');
                const posts = rawResult;
                return { posts, size };
            },
        }),
    }),
});

export const { useGetPostsQuery } = widgetsPostsListApi;
