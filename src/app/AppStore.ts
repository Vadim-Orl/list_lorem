import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../shared/api/baseApi';
import postsListReducer from '../widgets/PostsList/api/PostsListSlise';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    data: postsListReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
