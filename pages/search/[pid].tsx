import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { randomTip, searchInitPosts, searchPosts } from '@actions/post';
import Mainpage from '../../components/mainpage';
import { IArticle, searchRequestPage } from '@features/postSlice';
import PostCard from '@components/PostCard';
import { useRouter } from 'next/router';
import Head from 'next/head';

function PostList() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { pid } = router.query
    const { mainPosts, loadPostsLoading, hasMorePosts, searchValue, ranTip } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(0);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        dispatch(searchRequestPage({ searchValue }))
    }, [requestPage, searchValue, mainPosts])

    useEffect(() => {
        if (pid === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(searchPosts({ keywords: pid, requestedPageNumber: searchValue, requestedPageSize: 10 }))
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
                <meta name="description" content={`${(searchValue)}`} />
                <meta name="keywords" content="Search" />
                <meta property="og:title" content="검색페이지 | Project ACO" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:description" content={`${(searchValue)}`} />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
            </Head>
            <div>
                <Mainpage>
                    <div className="ml-auto mr-auto">
                    <h2 id="accordion-collapse-heading-1" className='px-6'>
                        <div className="flex items-center justify-between w-full p-5 font-medium text-left bg-gray-50 text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400"
                            >
                            <div className='flex items-center gap-2'>   
                                <span>태그/검색 키워드 : {pid}</span>
                            </div>
                        </div>
                    </h2>
                        {mainPosts.map((post: IArticle) => {
                            return (
                                <PostCard key={post.articleId} post={post} />
                            )
                        })}
                    </div>
                    <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 80 }} />
                </Mainpage>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {

    const payload = await store.dispatch(searchInitPosts({ keywords: params?.pid, requestedPageNumber: 0, requestedPageSize: 10 } as any))
    await store.dispatch(randomTip())
    await store.dispatch(searchRequestPage({ searchValue: 0 }))
    return {
        props: { message: "Success SSR", payload:payload },
    }
})

export default PostList