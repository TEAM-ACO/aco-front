import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadMenu } from '@actions/post';
import Mainpage from '../../mainpage/mainpage';
import PostForm from '../../mainpage/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '../../mainpage/PostCard';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

const Diary: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const dispatch = useAppDispatch();
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(1);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
        dispatch(loadMenu({ num: 0, menu: "Diary", requestedPageNumber: requestPage, requestedPageSize: 10 }));
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

    return (
        <div>
            <Head>
                <title>ACO 다이어리 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Diary page" />
                <meta name="keywords" content="Diary" />
                <meta property="og:title" content="ACO 다이어리 | Project ACO" />
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

    const { payload } = await store.dispatch(loadMenu({ num: 0, menu: "Diary", requestedPageNumber: 0, requestedPageSize: 10 }));

    return { props: { message: 'Success SSR', payload } }
})

export default Diary