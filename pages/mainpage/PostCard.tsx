import React, { useState, useCallback } from 'react'
import { useCookies } from "react-cookie"
import { IArticle, IReply } from '@features/postSlice';
import { useAppDispatch, useAppSelector } from '@store/config';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Avatar, Button, Carousel } from 'flowbite-react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Dropdown from './Dropdown';
import PostCardContent from './PostCardContent';
import PostImage from './PostImage';
import { likePost, updateComment } from '@actions/post';

type PostProps = {
    post: IArticle
}

const PostCard = ({ post }: PostProps) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const dispatch = useAppDispatch();
    const { loadPostsDone } = useAppSelector((state) => state.post);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [requestPage, setRequestPage] = useState<number>(0);
    const [requestComment, setRequestComment] = useState<number>(10);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    const loadMoreComment = useCallback(() => {
        setRequestComment(prev => prev + 5);
    }, [requestComment])

    // 댓글 업데이트
    const onCommentViewMore = useCallback(() => {
        dispatch(updateComment({
            article: { articleId: post.articleId },
            requestedPageNumber: requestPage, requestedPageSize: requestComment
        }))
        loadMore();
        loadMoreComment();
    }, [requestPage])

    const onFavoriteToggle = useCallback(() => {
        dispatch(likePost({ article: { articleId: post.articleId }, liker: cookies.user.num }))
        setFavorite((prev) => !prev)
    }, [])

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg pb-7">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <div>
                            <Carousel className='px-6 py-4 xl:h-80  carousel-class' slide={false}>
                                {post.articleImagesNames.map((articleImages) => {
                                    return (
                                        <PostImage key={articleImages} articleImages={articleImages} />
                                    )
                                })}
                            </Carousel>
                        </div>
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
                                        {post.member.nickname}
                                    </p>
                                </button>
                            </div>
                            <Dropdown key={post.articleId} post={post} />
                        </div>
                        <div>
                            <p className="text-gray-700 text-base">
                                {post.articleContext}
                            </p>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        {favorite ? <FaHeart onClick={onFavoriteToggle} className='text-red-600 cursor-pointer'></FaHeart>
                            : <FaRegHeart onClick={onFavoriteToggle} className='text-gray-400 cursor-pointer'></FaRegHeart>}
                    </div>
                    {/* HASHTAG */}
                    <div className="px-6 pt-4 pb-2">
                        {post.tags.map((tags) => {
                            return (
                                <PostCardContent key={tags} tags={tags} />
                            )
                        })}
                    </div>
                    {/* Comment Input */}
                    <CommentForm post={post} />
                    <div>
                        <div className=" border-l border-gray-200 dark:border-gray-700">
                            <div className='ml-6 py-2 mt-3 text-xs text-cyan-800'>
                                {`${post.replys[post.replys.length - 1]?.totalCount || 0}개의 댓글`}
                            </div>
                            <div className='mt-2'>
                                {/* 전체 댓글 수 보내달라고 할 것 */}
                                {post.replys.map((cmt: IReply) => (
                                    <CommentList key={cmt.replyId} comment={cmt} />
                                ))}
                                {/* 총 댓글 개수는 여기서 뽑아야할것같아영 paging할때 총개수도 넘기도록 만들어놨어영*/}
                            </div>
                            <div className='ml-6 py-2 mt-3'>
                                {post.replys.length >= 5 ?
                                    <Button onClick={onCommentViewMore}>
                                        댓글 더 보기
                                    </Button>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostCard;