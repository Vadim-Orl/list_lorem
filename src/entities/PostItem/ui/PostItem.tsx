import { useRef, useState } from 'react';
import { Post } from '../../../shared';
import { makeFirstLetterToUpper } from '../../../shared/helpers/makeFirstLetterToUpper';
import './PostItem.scss';
import { useCombinedRefs } from '../../../shared/hooks/useCombinedRefs';

interface IPostItemProps {
    post: Post;
    myref?: React.Ref<HTMLElement>;
}

const PostItem = ({ post, myref }: IPostItemProps): JSX.Element => {
    const [active, setActive] = useState(false);
    const refPost = useRef<HTMLDivElement>(null);

    const refs = useCombinedRefs(refPost, myref);
    const clickHandler = () => {
        const currentPost = refPost.current;

        if (currentPost) {
            if (!active) {
                currentPost?.classList.add('post--active');
                setActive(true);
            } else {
                currentPost?.classList.remove('post--active');
                setActive(false);
            }
        }
    };

    return (
        <article className="posts__item post" ref={refs} onClick={clickHandler}>
            <h2 className="post__title">
                {makeFirstLetterToUpper(post.title)}
            </h2>
            <p className="post__desc">{makeFirstLetterToUpper(post.body)}</p>
        </article>
    );
};

export default PostItem;
