import { useAppSelector } from '@store/config';
import React from 'react'
import Comments from './Comments';
import PostCardContent from './PostCardContent';

function PostCard({ post }) {
    const { isLoading } = useAppSelector((state) => state.post);
    return (
        <>
            <section className="px-6">
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
                    <Comments />
                </div>
            </section>
        </>
    )
}

export default PostCard;