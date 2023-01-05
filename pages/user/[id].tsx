import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector, wrapper } from '@store/config';
import { useInView } from 'react-intersection-observer';

import PostCard from '@pages/mainpage/PostCard';
import { useRouter } from 'next/router';
import { IArticle } from '@features/postSlice';
import PostForm from '@pages/mainpage/PostForm';
import Mainpage from '@pages/mainpage/mainpage';
import { loadUserPosts } from '@actions/post';
import axios from 'axios';

// dynamic routing - 이거 하려면 Next작성 이후에 해야하는 듯.
const userid = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const { userInfo, me } = useAppSelector((state) => state.user);

    const [ref, inView] = useInView();
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (id === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadUserPosts({ memberId: id, requestedPageNumber: requestPage, requestedPageSize: 5 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading, id]);

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }: any) => {
    console.log(store, req)
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        // cookie.user
    }
    store.dispatch(loadUserPosts({ memberId: params.id } as any) as any)
    return {
        props: { message: 'Message from SSR' },
    }
})

export default userid