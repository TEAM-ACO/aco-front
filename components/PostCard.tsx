import React, { useState, useCallback, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { IArticle, IReply, mainRequestPage, userRequestPage } from '@features/postSlice';
import { useAppDispatch } from '@store/config';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import dayjs from 'dayjs';
import { Avatar, Carousel, Tooltip } from 'flowbite-react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Dropdown from './Dropdown';
import PostCardContent from './PostCardContent';
import PostImage from './PostImage';
import { likePost, updateComment } from '@actions/post';
import { useRouter } from 'next/router';
import PostModifyForm from './PostModifyForm';
import CommentMore from './CommentMore';
import { imgUrl } from 'util/imgUrl';

type PostProps = {
    post: IArticle
}

const PostCard = ({ post }: PostProps) => {
    const date = dayjs(post.date).format("YY-MM-DD");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [cookies] = useCookies(['user']);
    const [contextModify, setContextModify] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [favoriteError, setFavoriteError] = useState<boolean>(false);
    const [requestPage, setRequestPage] = useState<number>(0);
    const [requestComment, setRequestComment] = useState<number>(5);
        
    const userinfo = useCallback(() => {
        router.push(`/user/${post.member.memberId}`)
        dispatch(userRequestPage({ reqPage: 0 }))
    }, [])
    
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
            requestedPageNumber: requestPage, requestedPageSize: post.replys[post.replys.length - 1].totalCount
        }))
        loadMore();
        loadMoreComment();
    }, [requestPage, requestComment])

    const onFavoriteToggle = useCallback(() => {
        if (post.member.memberId === cookies.user.num) {
            setFavoriteError(true)
            return
        }
        dispatch(likePost({ article: post.articleId, liker: Number(cookies.user.num) }))
        setFavorite((prev) => !prev)
        setFavoriteError(false)

    }, [favorite, favoriteError])

    const onMenu = useCallback(() => {
        router.push(`/category/${post.menu.toLowerCase()}`)
        dispatch(mainRequestPage({ requestPage: 0 }))
    }, [])
    
    useEffect(() => {
        if (post.likes === 1) {
            setFavorite(true)
        } else if (post.likes === 0) {
            setFavorite(false)
        }
    }, [post.menu])
    
    useEffect(() => {
        if (!cookies.user) {
            router.replace('/')
        }
    })

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg pb-7">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <div>
                            <Carousel className='px-6 py-4 xl:h-80 carousel-class' slide={false}>
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
                                <button
                                    onClick={userinfo}
                                    className='flex justify-start items-center'>
                                    <Avatar
                                        img={`${imgUrl}/image/user/${post.member.memberId}`}
                                        rounded={true}
                                        className="w-10 h-10"
                                    />
                                    <p className='ml-2'>
                                        {post.member.nickname}
                                    </p>
                                </button>
                            </div>
                            <Dropdown key={post.articleId} post={post}
                                contextModify={contextModify} setContextModify={setContextModify} />
                        </div>
                        {contextModify ?
                            <PostModifyForm key={post.articleId} post={post}
                                contextModify={contextModify} setContextModify={setContextModify} />
                            :
                            <div>
                                <div className='text-gray-500 text-xs items-center mb-3 flex justify-between'>
                                    <div className='flex'>
                                        카테고리:&nbsp;
                                        {router.asPath.split('/')[2] === post.menu.toLowerCase() ?
                                            <Tooltip content="현재 카테고리">
                                                <button>
                                                    {post.menu}
                                                </button>
                                            </Tooltip>
                                            :
                                            <button onClick={onMenu}>
                                                {post.menu}
                                            </button>
                                        }
                                    </div>
                                    <div>
                                        {date}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-700 text-base">
                                        {post.articleContext}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    {contextModify ?
                        <></>
                        :
                        <>
                            <div className="px-6 py-4">
                                {favorite ? <FaHeart onClick={onFavoriteToggle} className='text-red-600 cursor-pointer'></FaHeart>
                                    : <FaRegHeart onClick={onFavoriteToggle} className='text-gray-400 cursor-pointer'></FaRegHeart>}
                                {favoriteError &&
                                    <p className='mt-2 text-xs font-medium text-red-600'>자신의 게시글은 좋아요를 누를 수 없습니다</p>}
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
                                        {post.replys.map((cmt: IReply) => (
                                            <CommentList key={cmt.replyId} comment={cmt} />
                                        ))}
                                    </div>
                                    <CommentMore replys={post.replys} onCommentViewMore={onCommentViewMore} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default PostCard;