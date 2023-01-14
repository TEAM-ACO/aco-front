import React, { useState, useCallback } from 'react'
import { useCookies } from "react-cookie"
import { IArticle, IReply } from '@features/postSlice';
import { useAppDispatch, useAppSelector } from '@store/config';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import dayjs from 'dayjs';
import { Avatar, Button, Carousel } from 'flowbite-react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Dropdown from './Dropdown';
import PostCardContent from './PostCardContent';
import PostImage from './PostImage';
import { likePost, updateComment } from '@actions/post';
import { useRouter } from 'next/router';
import ReactTextareaAutosize from 'react-textarea-autosize';
import PostModifyForm from './PostModifyForm';

type PostProps = {
    post: IArticle
}

const PostCard = ({ post }: PostProps) => {
    const date = dayjs(post.date).format("YY-MM-DD");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { loadPostsDone } = useAppSelector((state) => state.post);
    const [contextModify, setContextModify] = useState<boolean>(false);
    const [text, setText] = useState<string>('')
    const [favorite, setFavorite] = useState<boolean>(false);
    const [requestPage, setRequestPage] = useState<number>(0);
    const [requestComment, setRequestComment] = useState<number>(5);
    const [allCount, setAllCount] = useState(post.replys[post.replys.length - 1]?.totalCount || 0)

    const userinfo = useCallback(() => {
        router.push(`/user/${post.member.memberId}`)
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
        dispatch(likePost({ article: { articleId: post.articleId }, liker: cookies.user.num }))
        setFavorite((prev) => !prev)
    }, [favorite])

    const onMenu = useCallback(() => {
        router.push(`/category/${post.menu.toLowerCase()}`)
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
                                    onClick={userinfo}
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
                            <Dropdown key={post.articleId} post={post}
                                contextModify={contextModify} setContextModify={setContextModify} />
                        </div>
                        {contextModify ?
                            <PostModifyForm key={post.articleId} post={post} contextModify={contextModify} />
                            :
                            <div>
                                <div className='text-gray-500 text-xs items-center mb-3 flex justify-between'>
                                    <p>
                                        카테고리:&nbsp;
                                        <button onClick={onMenu}>
                                            {post.menu}
                                        </button>
                                    </p>
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
                                        {allCount - post.replys.length >= 5 ?
                                            <Button onClick={onCommentViewMore}>
                                                댓글 더 보기
                                            </Button>
                                            : <></>
                                        }
                                    </div>
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