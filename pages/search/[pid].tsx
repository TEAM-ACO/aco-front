import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadPosts, searchPosts } from '@actions/post';
import Mainpage from '../mainpage/mainpage';
import PostForm from '../mainpage/PostForm';
import { IArticle, searchRequestPage } from '@features/postSlice';
import PostCard from '../mainpage/PostCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

function PostList() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { pid } = router.query
    const { mainPosts, loadPostsLoading, hasMorePosts, searchValue } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(0);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        dispatch(searchRequestPage({ searchValue }))
    }, [requestPage])

    useEffect(() => {
        if (pid === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(searchPosts({ keywords: pid, requestedPageNumber: searchValue, requestedPageSize: 10 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading, pid]);
    return (
        <>
            <Head>
                <title>{pid} | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Search page" />
                <meta name="keywords" content="Search" />
                <meta property="og:title" content="검색페이지 | Project ACO" />
            </Head>
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
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {

    store.dispatch(searchPosts({ keywords: params?.pid } as any))
    return {
        props: {},
    }
})

export default PostList