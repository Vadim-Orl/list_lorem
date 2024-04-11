import { Suspense, lazy } from 'react';
import './App.scss';
import { Loader } from '../shared';
import { PostsList } from '../widgets/PostsList/ui/PostsList/PostsList';

// const PostItem = lazy(() => import('../entities/PostItem/ui/PostItem'));
// const PostList = lazy(
//     () => import('../widgets/PostsList/ui/PostsList/PostsList')
// );

export default function App(): JSX.Element {
    return (
        <div className="app">
            {/* <Suspense fallback={<Loader />}> */}
            <PostsList />
            {/* </Suspense> */}
        </div>
    );
}
