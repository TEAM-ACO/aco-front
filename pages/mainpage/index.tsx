import React, { useEffect } from 'react'
import PostCard from './PostCard';
import OffCanvas from './offcanvas'
import SpeedDial from './SpeedDial'
import { useAppDispatch, useAppSelector } from '@store/config';
import { loadPosts, IPost } from '@features/postSlice';
import PostForm from './PostForm';
import Channel from './Channel';

function mainpage() {
    const { mainPosts } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(loadPosts());
    // }, [mainPosts]);
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="w-64 offcanvas__sticky">
                    <OffCanvas />
                </div>
                <div className="w-8/12">
                    <PostForm />
                    {mainPosts.map((post: IPost) => {
                        return (
                            <PostCard key={post.writer} post={post} />
                        )
                    })}
                </div>
                <div className="w-80">
                    <Channel />
                </div>
            </div>
            <SpeedDial />
        </div>
    )
}

export default mainpage