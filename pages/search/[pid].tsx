import React, { useCallback, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadPosts, searchPosts } from '@actions/post';
import Mainpage from '../mainpage/mainpage';
import PostForm from '../mainpage/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '../mainpage/PostCard';
import { useRouter } from 'next/router';

function PostList() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { pid } = router.query
    // singlePosts 만들기
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(0);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        console.log(pid)
        if (pid === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(searchPosts({ keywords: pid, requestedPageNumber: requestPage, requestedPageSize: 5 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading, pid]);
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

export default PostList