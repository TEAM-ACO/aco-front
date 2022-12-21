import React, { useEffect, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';

import PostCard from './PostCard';
import { IArticle } from '@features/postSlice';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { useRouter } from 'next/router';
import { loadPosts } from '@actions/post';

function mainpage() {
    const { mainPosts } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const { asPath } = useRouter();

    useEffect(() => {
        dispatch(loadPosts());
    }, []);

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
            </Mainpage>
        </div>
    )
}

export default mainpage