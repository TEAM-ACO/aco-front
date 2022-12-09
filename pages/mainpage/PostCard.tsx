import { IComments, IPost } from '@features/postSlice';
import { useAppSelector } from '@store/config';
import dayjs from 'dayjs';
import React, { useState, useCallback } from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostCardContent from './PostCardContent';

function PostCard({ post }: any) {
    const { isLoading } = useAppSelector((state) => state.post);
    const [postCardDropdown, setPostCardDropdown] = useState<boolean>(true);

    const onTogglePostCardDropdown = useCallback(() => {
        setPostCardDropdown((prev) => !prev)
    }, [])

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg pb-7">
                    <div className="px-6 py-4">
                        <img className='object-cover' src={post.articleImage} alt='img' />
                    </div>
                    <div className="px-6 py-4">
                        <div>
                            <button
                                id="dropdownMenuIconHorizontalButton"
                                data-dropdown-toggle="dropdownDotsHorizontal"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                                onClick={onTogglePostCardDropdown}
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                            </button>
                            <div className={postCardDropdown ? 'hidden' : 'flex'}>
                                <div
                                    id="dropdownDotsHorizontal"
                                    className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul
                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownMenuIconHorizontalButton">
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <button
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            게시글 삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {post.writer}
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">{post.title}</div>
                        </div>
                        <div>
                            <p className="text-gray-700 text-base">
                                {post.content}
                            </p>
                        </div>
                    </div>
                    {/* HASHTAG */}
                    <PostCardContent />
                    <CommentForm post={post} />
                    <div>
                        <ol className=" border-l border-gray-200 dark:border-gray-700">
                            <div className='ml-6 py-2 text-xs'>
                                {`${post.Comments.length}개의 댓글`}
                            </div>
                            {/* 만약 CommentList로 뺀게 불편하다면 말씀해주세요. */}
                            {post.Comments.map((post: any) => {
                                return (
                                    <CommentList key={post.User.nickname} comment={post} />
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostCard;