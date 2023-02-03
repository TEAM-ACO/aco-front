import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadMenu } from '@actions/post';
import Mainpage from '@app/mainpage';
import PostForm from '@app/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '@app/PostCard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const Tip = () => {
    const dispatch = useAppDispatch();
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(0);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadMenu({ num: 1, menu: "Tip", requestedPageNumber: requestPage, requestedPageSize: 10 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading]);
    return (
        <div>
            <Head>
                <title>ACO 팁 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Tip page" />
                <meta name="keywords" content="Tip" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:title" content="ACO 팁 | Project ACO" />
                <meta property="og:description" content="Tip page" />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
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

    await store.dispatch(loadMenu({ num: 1, menu: "Tip", requestedPageNumber: 0, requestedPageSize: 10 }));

    return { props: {} }
})

export default Tip