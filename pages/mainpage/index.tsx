import React, { useEffect, useState, useCallback } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';

import PostCard from './PostCard';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { IArticle } from '@features/postSlice';
import { loadPosts } from '@actions/post';
import { useCookies } from "react-cookie"
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

function mainpage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [ref, inView] = useInView();
    const [requestPage, setRequestPage] = useState<number>(0);

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts({ requestedPageNumber: requestPage, requestedPageSize: 10 }));
            loadMore();
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    return (
        <div>
            <Mainpage>
                <div className="ml-auto mr-auto">
                    <PostForm reqPage={requestPage} setReqPage={setRequestPage} />
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
    console.log('getServerSideProps start');
    console.log(req.headers);

    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) { //cookie => cookis.user
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadPosts());

    return { props: { message: 'Success SSR' } }
})

export default mainpage