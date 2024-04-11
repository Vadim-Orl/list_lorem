import './PostsList.scss';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks/hooks';
import { widgetsPostsListApi } from '../../api/widgetsPostsListApi';
import { COUNT_POST_FOR_LIST } from '../../../../app/config/consts';
import PostItem from '../../../../entities/PostItem/ui/PostItem';
import { Error, Loader } from '../../../../shared';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { incrementPage } from '../../api/PostsListSlise';

export function PostsList() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const page = useAppSelector((store) => store.data.page);
    const listPosts = useAppSelector((store) => store.data.posts);
    const sizePost = Number(useAppSelector((store) => store.data.size));

    const { isLoading, isFetching, isError } =
        widgetsPostsListApi.useGetPostsQuery({
            limit: COUNT_POST_FOR_LIST,
            pageNumber: page,
        });

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !loading && listPosts.length < sizePost) {
            dispatch(incrementPage());
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [inView]);

    return (
        <div className="posts__wrapper">
            <div className="posts__list">
                {listPosts.map((el, index) => {
                    if (index + 1 === listPosts.length) {
                        return <PostItem key={el.id} post={el} myref={ref} />;
                    }
                    return <PostItem key={el.id} post={el} />;
                })}
            </div>
            {(isFetching || isLoading) && <Loader />}
            {isError && <Error />}
        </div>
    );
}
