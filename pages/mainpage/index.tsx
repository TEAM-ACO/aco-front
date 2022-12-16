import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config';

import PostCard from './PostCard';
import { IPost } from '@features/postSlice';
import PostForm from './PostForm';
import Mainpage from './mainpage';
import { useRouter } from 'next/router';
import Chat from './Chat';

function mainpage() {
    const { mainPosts, postAdded } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const { asPath } = useRouter();

    return (
        <div>
            <Mainpage>
                <div className="w-8/12">
                    {asPath === '/mainpage' ?
                        <>
                            <PostForm />
                            {mainPosts.map((post: IPost) => {
                                return (
                                    <PostCard key={post.mid} post={post} />
                                )
                            })}
                        </>
                        :
                        <Chat />
                    }
                </div>
            </Mainpage>

        </div>
    )
}

export default mainpage