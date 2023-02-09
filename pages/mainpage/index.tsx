import React, { useEffect, useCallback } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';
import Head from 'next/head';

import PostCard from '@components/PostCard';
import PostForm from '@components/PostForm';
import Mainpage from '@components/mainpage';
import { IArticle, mainRequestPage } from '@features/postSlice';
import { loadInitPosts, loadPosts, randomTip } from '@actions/post';
import { useInView } from 'react-intersection-observer';

const mainpage = () => {
    const [cookies] = useCookies(['user']);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mainPosts, loadPostsLoading, hasMorePosts, mainReqPage } = useAppSelector((state) => state.post);
    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        dispatch(mainRequestPage({ mainReqPage }))
    }, [mainReqPage])
    
    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts({ requestedPageNumber: mainReqPage, requestedPageSize: 10 }));
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
                <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 80 }} />
            </Mainpage>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const mainReqPage = 0
    const payload = await store.dispatch(loadInitPosts({ requestedPageNumber: mainReqPage, requestedPageSize: 10 }));
    await store.dispatch(randomTip())
    await store.dispatch(mainRequestPage({ mainReqPage: 0 }))

    return { props: { message: 'Success SSR', payload: payload } }
})

export default mainpage