import React, { useEffect, useCallback } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';

import PostCard from '@app/PostCard';
import PostForm from '@app/PostForm';
import Mainpage from '../../app/mainpage';
import { IArticle, mainRequestPage } from '@features/postSlice';
import { loadPosts } from '@actions/post';
import { useCookies } from "react-cookie"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

const mainpage: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mainPosts, loadPostsLoading, hasMorePosts, mainReqPage } = useAppSelector((state) => state.post);
    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        dispatch(mainRequestPage({ mainReqPage }))
        dispatch(loadPosts({ requestedPageNumber: mainReqPage, requestedPageSize: 10 }));
    }, [mainReqPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            loadMore();
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

    useEffect(() => {
        if (!cookies.user) {
            router.replace('/')
        }
    })

    return (
        <div>
            <Head>
                <title>ACO 메인페이지 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="ACO Mainpage page입니다." />
                <meta name="keywords" content="Mainpage" />
                <meta property="og:title" content="ACO 메인페이지 | Project ACO" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:description" content="ACO Mainpage page입니다." />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const mainReqPage = 0
    const { payload } = await store.dispatch(loadPosts({ requestedPageNumber: mainReqPage, requestedPageSize: 10 }));
    await store.dispatch(mainRequestPage({ mainReqPage: 0 }))

    return { props: { message: 'Success SSR', payload } }
})

export default mainpage