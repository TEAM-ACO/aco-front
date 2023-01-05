import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadMenu, searchPosts } from '@actions/post';
import Mainpage from '../mainpage/mainpage';
import PostForm from '../mainpage/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '../mainpage/PostCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Menu = () => {
    const dispatch = useAppDispatch();
    const { mainPosts, loadPostsLoading, hasMorePosts } = useAppSelector((state) => state.post);
    const [requestPage, setRequestPage] = useState<number>(0);

    const [ref, inView] = useInView();

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            dispatch(loadMenu({ menu: 0, requestedPageNumber: requestPage, requestedPageSize: 5 }));
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

//     const cookie = req ? req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (req && cookie) { //cookie => cookis.user
//         axios.defaults.headers.Cookie = cookie;
//     }
//     await store.dispatch(loadMenu({ menu: 0, requestedPageNumber: 0, requestedPageSize: 5 }));

//     return { props: { message: 'Success SSR' } }
// })

export default Menu