import { IComments, IPost } from '@features/postSlice';
import { useAppSelector } from '@store/config';
import dayjs from 'dayjs';
import { Avatar, Carousel } from 'flowbite-react';
import React, { useState, useCallback } from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Dropdown from './Dropdown';
import PostCardContent from './PostCardContent';

function PostCard({ post }: any) {
    const { isLoading } = useAppSelector((state) => state.post);

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg pb-7">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel slide={false}>
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                alt="..."
                            />
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                alt="..."
                            />
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                alt="..."
                            />
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                                alt="..."
                            />
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                                alt="..."
                            />
                        </Carousel>
                    </div>
                    <div className="px-6 py-4">
                        <img className='object-cover' src={post.articleImage} alt='img' />
                    </div>
                    <div className="px-6 py-4">
                        {/* 게시글 Dropdown */}
                        <div className='flex justify-between mb-3'>
                            <div className='flex justify-start items-center'>
                                {/* 누르면 프로필로 가게 할 것 */}
                                <button
                                    className='flex justify-start items-center'>
                                    <Avatar
                                        img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        rounded={true}
                                    />
                                    <p className='ml-2'>
                                        {post.writer}
                                    </p>
                                </button>
                            </div>
                            <Dropdown />
                        </div>
                        <div>
                            <p className="font-bold text-xl mb-2">{post.title}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-base">
                                {post.content}
                            </p>
                        </div>
                    </div>
                    {/* HASHTAG */}
                    <PostCardContent />
                    {/* Comment Input */}
                    <CommentForm post={post} />
                    <div>
                        <div className=" border-l border-gray-200 dark:border-gray-700">
                            <div className='ml-6 py-2 mt-3 text-xs text-cyan-800'>
                                {`${post.Comments.length}개의 댓글`}
                            </div>
                            <div className='mt-2'>
                                {/* 만약 CommentList로 뺀게 불편하다면 말씀해주세요. */}
                                {post.Comments.map((post: any) => {
                                    return (
                                        <CommentList key={post.User.nickname} comment={post} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostCard;