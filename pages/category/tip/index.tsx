import React, { useCallback, useState, useEffect } from 'react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { loadMenu } from '@actions/post';
import Mainpage from '../../mainpage/mainpage';
import PostForm from '../../mainpage/PostForm';
import { IArticle } from '@features/postSlice';
import PostCard from '../../mainpage/PostCard';
import { GetServerSideProps } from 'next';

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

    await store.dispatch(loadMenu());

    return { props: {} }
})

export default Tip