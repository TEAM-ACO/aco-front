import React, { useEffect, useState, useCallback } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';

import PostCard from './PostCard';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { IArticle, mainRequestPage } from '@features/postSlice';
import { loadPosts } from '@actions/post';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

function mainpage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mainPosts, loadPostsLoading, hasMorePosts, mainReqPage } = useAppSelector((state) => state.post);
    const [ref, inView] = useInView();
    const [requestPage, setRequestPage] = useState<number>(0);

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts({ requestedPageNumber: mainReqPage, requestedPageSize: 10 }));
            loadMore();
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

    const loadMore = useCallback(() => {
        // setRequestPage(prev => prev + 1);
        dispatch(mainRequestPage({ mainReqPage }))
    }, [mainReqPage])

    return (
        <div>
            <Head>
                <title>ACO 메인페이지 | Project ACO</title>
            </Head>
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


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {

    await store.dispatch(loadPosts());

    return { props: { message: 'Success SSR' } }
})

export default mainpage