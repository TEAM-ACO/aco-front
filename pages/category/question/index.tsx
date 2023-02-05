import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadInitMenu, loadMenu } from '@actions/post';
import Mainpage from '@app/mainpage';
import PostForm from '@app/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '@app/PostCard';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

const Question: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(props)
    const dispatch = useAppDispatch();
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(1);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            loadMore()
            dispatch(loadMenu({ num: 2, menu: "Question", requestedPageNumber: requestPage, requestedPageSize: 10 }));
        }
    }, [inView, hasMorePosts, loadPostsLoading]);
    return (
        <div>
            <Head>
                <title>ACO 질문 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Question page" />
                <meta name="keywords" content="Question" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:title" content="ACO 질문 | Project ACO" />
                <meta property="og:description" content="Question page" />
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
                <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 80 }} />
            </Mainpage>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const requestPage = 0
    const payload = await store.dispatch(loadInitMenu({ num: 2, menu: "Question", requestedPageNumber: requestPage, requestedPageSize: 10 }));

    return { props: { message: 'Success SSR', payload:payload} }
})

export default Question