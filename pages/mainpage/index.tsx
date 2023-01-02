import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';

import PostCard from './PostCard';
import { IArticle } from '@features/postSlice';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { loadPosts } from '@actions/post';

function mainpage() {
    const dispatch = useAppDispatch();
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [ref, inView] = useInView();
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts({ requestedPageNumber: requestPage, requestedPageSize: 5 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

    return (
        <div>
            <Mainpage>
                <div className="ml-auto mr-auto">
                    <PostForm />
                    {mainPosts.map((post: IArticle) => {
                        return (
                            <PostCard key={post.articleId} post={post} />
                        )
                    })}
                </div>
                <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 5 }} />
            </Mainpage>
        </div>
    )
}

export default mainpage