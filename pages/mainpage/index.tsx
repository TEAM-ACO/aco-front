import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';

import PostCard from './PostCard';
import { IPost } from '@features/postSlice';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { useRouter } from 'next/router';

function mainpage() {
    const { mainPosts } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const { asPath } = useRouter();

    return (
        <div>
            <Mainpage>
                <div className="ml-auto mr-auto">
                    <PostForm />
                    {mainPosts.map((post: IPost) => {
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