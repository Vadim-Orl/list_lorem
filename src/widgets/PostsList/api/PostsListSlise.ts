import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../shared';
import { widgetsPostsListApi } from './widgetsPostsListApi';

type IInitialState = {
    posts: Post[];
    size: string | null | undefined;
    page: number;
};

const initialState: IInitialState = {
    posts: [],
    size: '',
    page: 1,
};

const postSlice = createSlice({
    name: '@posts',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page++;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            widgetsPostsListApi.endpoints.getPosts.matchFulfilled,
            (state, { payload }) => {
                console.log(payload);
                state.size = payload.size;
                state.posts = state.posts.concat(payload.posts);
            }
        );
    },
});

export default postSlice.reducer;
export const { incrementPage } = postSlice.actions;
