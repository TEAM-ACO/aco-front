import { IComments, IPost } from '@features/postSlice';
import { useAppSelector } from '@store/config';
import dayjs from 'dayjs';
import React from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostCardContent from './PostCardContent';

function PostCard({ post }: any) {
    const { isLoading } = useAppSelector((state) => state.post);

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg">
                    <img className='object-cover' src={post.articleImage} alt='img' />
                    <div className="px-6 py-4">
                        {post.writer}
                        {/* title */}
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                        {/* 본문 */}
                        <p className="text-gray-700 text-base">
                            {post.content}
                        </p>
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