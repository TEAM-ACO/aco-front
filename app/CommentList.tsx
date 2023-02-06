import React, { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useCookies } from "react-cookie"
import { Avatar, Modal, Button, Spinner } from 'flowbite-react'
import dayjs from 'dayjs';
import { deleteReplyToMe, IReply, userRequestPage } from '@features/postSlice';
import { useRouter } from 'next/router';
import ReComments from './ReCommentForm';
import { useAppDispatch, useAppSelector } from '@store/config';
import { deleteComment } from '@actions/post';
import { imgUrl } from 'util/imgUrl';

type CommentProps = {
    comment: IReply
}

function CommentList({ comment }: CommentProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { deleteCommentLoading } = useAppSelector((state) => state.post)
    const date = dayjs(comment.date).format("YY-MM-DD");

    const [bigComment, setBigComment] = useState<boolean>(false);
    const [commentDelete, setCommentDelete] = useState<boolean>(false);
    const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);

    const userinfo = useCallback(() => {
        dispatch(userRequestPage({ reqPage: 0 }))
        router.push(`/user/${comment.member.memberId}`)
    }, [])

    const onRereplyModalOpen = useCallback(() => {
        setBigComment((prev) => !prev)
    }, [bigComment])

    const onDeleteOpen = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
    }, [onDeleteModal])

    const onDeleteClose = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
        setCommentDelete(false)
    }, [onDeleteModal, commentDelete])

    const onCommentDelete = useCallback(() => {
        dispatch(deleteComment({
            replyId: comment.replyId,
            member: { memberId: comment.member.memberId }, article: { articleId: comment.article.articleId }
        }))
        dispatch(deleteReplyToMe({ articleId: comment.article.articleId, replyId: comment.replyId }))
        setOnDeleteModal(false)
        setCommentDelete(false)
    }, [onDeleteModal, commentDelete])

    // const [replySortCheck, setReplySortCheck] = useState<number>();
    // const [nicknameCheck, setNicknameCheck] = useState<string>();
    // const [replyContextCheck, setReplyContextCheck] = useState<string[]>();
    // const [memberIdCheck, setMemberIdCheck] = useState<number>();

    // useEffect(() => {
    //     setDayCheck(comment.date)
    //     setReplySortCheck(comment.replySort)
    //     setNicknameCheck(comment.member.nickname)
    //     setReplyContextCheck(comment.replyContext)
    //     setMemberIdCheck(comment.member.memberId)
    // }, [])

    return (
        <div>
            <li className="ml-6 flex items-center justify-between">
                <div className='flex items-center'>
                    <div>
                        {comment.replySort === 1 && <p className='px-3'>ㄴ</p>}
                    </div>
                    <button className='pr-2' onClick={userinfo}>
                        <div className='w-10'>
                            <Avatar
                                img={`${imgUrl}/image/user/${comment.member.memberId}`}
                                rounded={true}
                            />
                        </div>
                    </button>
                    <div className='mr-5 w-10'>
                        <button className="text-sm font-medium text-gray-900 dark:text-white"
                            onClick={userinfo}>{comment.member.nickname}</button>
                    </div>
                    <div className="text-sm break-words font-normal text-gray-500 lex dark:text-gray-300">
                        {comment.replyContext}
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600">
                    <time className="w-14 text-xs font-normal text-gray-400 sm:mb-0">
                        {date}
                    </time>
                    {comment.replySort === 0 &&
                        <button onClick={onRereplyModalOpen} className="sm:order-last mr-3 w-8">
                            {bigComment ? '취소' : '답글'}
                        </button>
                    }
                    {comment.member.memberId === cookies.user?.num &&
                        <button onClick={onDeleteOpen} className="sm:order-last mr-3 w-8">
                            삭제
                        </button>
                    }
                </div>
            </li>
            <div className={commentDelete ? 'flex' : 'hidden'}>
                {/* 삭제 Modal */}
                <Modal
                    show={onDeleteModal}
                    size="md"
                    popup={true}
                    onClose={onDeleteClose}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <svg
                                aria-hidden="true"
                                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                정말로 댓글을 삭제 하시겠습니까?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={onCommentDelete}
                                >
                                    {deleteCommentLoading ?
                                        <Spinner /> :
                                        '삭제하기'
                                    }
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={onDeleteClose}
                                >
                                    나가기
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div className={bigComment ? 'block' : 'hidden'}>
                <ReComments comment={comment} setBigComment={setBigComment} />
            </div>
        </div>
    )
}

export default CommentList