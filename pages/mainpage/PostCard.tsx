import React, { useState, useCallback, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { IArticle, IReply, userRequestPage } from '@features/postSlice';
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
    const [dateCheck, setDateCheck] = useState<string>();
    const date = dayjs(dateCheck).format("YY-MM-DD");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [contextModify, setContextModify] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [favoriteError, setFavoriteError] = useState<boolean>(false);
    const [requestPage, setRequestPage] = useState<number>(0);
    const [requestComment, setRequestComment] = useState<number>(5);

    const [articleImageCheck, setArticleImageCheck] = useState<string[]>([]);
    const [memberIdCheck, setMemberIdCheck] = useState<number>();
    const [nicknameCheck, setNicknameCheck] = useState<string>();
    const [articleIdCheck, setArticleIdCheck] = useState<number>();
    const [menuCheck, setMenuCheck] = useState<string>();
    const [articleContextCheck, setArticleContextCheck] = useState<string>();
    const [tagsCheck, setTagsCheck] = useState<string[]>([]);
    const [replysCheck, setReplysCheck] = useState<IReply[]>([]);
    const [replyCountCheck, setReplyCountCheck] = useState<number>();
    const [categoryCheck, setCategoryCheck] = useState<boolean>();

    const userinfo = useCallback(() => {
        dispatch(userRequestPage({ reqPage: 0 }))
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
    }, [])

    const commentListUpdate = useCallback(() => {
        dispatch(updateComment({
            article: { articleId: post.articleId },
            requestedPageNumber: requestPage, requestedPageSize: post.replys[post.replys.length - 1]?.totalCount
        }))
    }, [requestPage, requestComment])

    useEffect(() => {
        if (post.likes === 1) {
            setFavorite(true)
        } else if (post.likes === 0) {
            setFavorite(false)
        }
    }, [])

    useEffect(() => {
        if (!cookies.user) {
            router.replace('/')
        }
    })

    useEffect(() => {
        setDateCheck(post.date)
        setArticleImageCheck(post.articleImagesNames)
        setMemberIdCheck(post.member.memberId)
        setNicknameCheck(post.member.nickname)
        setArticleIdCheck(post.articleId)
        setMenuCheck(post.menu)
        setArticleContextCheck(post.articleContext)
        setTagsCheck(post.tags)
        setReplysCheck(post.replys)
        setReplyCountCheck(post.replys[post.replys.length - 1]?.totalCount || 0)
        setCategoryCheck(router.asPath.split('/')[2] === post.menu.toLowerCase())
    })

    return (
        <>
            <section className="px-6 py-4">
                <div className="rounded overflow-hidden shadow-lg pb-7">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <div>
                            <Carousel className='px-6 py-4 xl:h-80  carousel-class' slide={false}>
                                {articleImageCheck.map((articleImages) => {
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
                                        img={`${imgUrl}/image/user/${memberIdCheck}`}
                                        rounded={true}
                                    />
                                    <p className='ml-2'>
                                        {nicknameCheck}
                                    </p>
                                </button>
                            </div>
                            <Dropdown key={articleIdCheck} post={post}
                                contextModify={contextModify} setContextModify={setContextModify} />
                        </div>
                        {contextModify ?
                            <PostModifyForm key={articleIdCheck} post={post}
                                contextModify={contextModify} setContextModify={setContextModify} />
                            :
                            <div>
                                <div className='text-gray-500 text-xs items-center mb-3 flex justify-between'>
                                    <div className='flex'>
                                        카테고리:&nbsp;
                                        {categoryCheck ?
                                            <Tooltip content="현재 카테고리">
                                                <button>
                                                    {menuCheck}
                                                </button>
                                            </Tooltip>
                                            :
                                            <button onClick={onMenu}>
                                                {menuCheck}
                                            </button>
                                        }
                                    </div>
                                    <div>
                                        {date}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-700 text-base">
                                        {articleContextCheck}
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
                                {tagsCheck.map((tags) => {
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
                                        {`${replyCountCheck}개의 댓글`}
                                    </div>
                                    <div className='mt-2'>
                                        {replysCheck.map((cmt: IReply) => (
                                            <CommentList key={cmt.replyId} comment={cmt} commentListUpdate={commentListUpdate} />
                                        ))}
                                    </div>
                                    <CommentMore replys={replysCheck} onCommentViewMore={onCommentViewMore} />
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