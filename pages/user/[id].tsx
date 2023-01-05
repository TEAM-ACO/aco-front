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
import { GetServerSideProps } from 'next';

const userid = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const { me } = useAppSelector((state) => state.user);

    const [ref, inView] = useInView();
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    // console.log(mainPosts)

    useEffect(() => {
        if (id === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadUserPosts({ memberId: id, requestedPageNumber: requestPage, requestedPageSize: 5 }));
            loadMore();
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    // console.log(req, params)
    // const cookie = req ? req.headers.cookie : '';
    // axios.defaults.headers.Cookie = '';
    // if (req && cookie) {
    //     axios.defaults.headers.Cookie = cookie
    // }
    store.dispatch(loadUserPosts({ memberId: params.id, requestedPageNumber: 0, requestedPageSize: 5 } as any))
    return {
        props: {},
    }
})

export default userid