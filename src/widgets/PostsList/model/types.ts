import { Post } from '../../../shared';

export interface Result {
    posts: Post[];
    size: string | null | undefined;
}
