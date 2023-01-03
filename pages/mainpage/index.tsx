import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';
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

    // useEffect(() => {
    //     if (!cookies.user) {
    //         router.replace('/')
    //     }
    // })

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts({ requestedPageNumber: requestPage, requestedPageSize: 5 }));
            loadMore()
        }
    }, [inView, hasMorePosts, loadPostsLoading]);

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


// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//     console.log('getServerSideProps start');
//     console.log(req.headers);

//     // 서버쪽으로 쿠키 전달하는 과정 (쿠키가 없으면 인식 못함)
//     const cookie = req ? req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     // 다른 사람이 내 페이지에서 로그인 했을 때 내 쿠키때문에 내 아이디로 로그인 되는 현상 방지 (쿠키공유 방지)
//     if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//     }
//     store.dispatch(loadPosts());

//     return { props: {} }
// })

export default mainpage