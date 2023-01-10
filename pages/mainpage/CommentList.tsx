import React, { useState, useCallback } from 'react'
import { useCookies } from "react-cookie"
import { Avatar, Modal, Button } from 'flowbite-react'
import dayjs from 'dayjs';
import { IReply } from '@features/postSlice';
import { useRouter } from 'next/router';
import ReComments from './ReCommentForm';

type CommentProps = {
    comment: IReply
}

function CommentList({ comment }: CommentProps) {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const date = dayjs(comment.date).format("YY-MM-DD");

    const [commentReport, setCommentReport] = useState<boolean>(false);
    const [commentDelete, setCommentDelete] = useState<boolean>(false);
    const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);

    const userinfo = useCallback(() => {
        router.push(`/user/${comment.member.memberId}`)
    }, [])

    const onRereplyModalOpen = useCallback(() => {
        setCommentReport((prev) => !prev)
    }, [])

    const onDeleteOpen = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
    }, [])

    const onDeleteClose = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
        setCommentDelete(false)
    }, [])

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
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
                    <time className="mr-3 text-xs font-normal text-gray-400 sm:mb-0">
                        {date}
                    </time>
                    {comment.replySort === 0 &&
                        <button onClick={onRereplyModalOpen} className="sm:order-last mr-3">
                            {commentReport ? '취소' : '답글'}
                        </button>
                    }
                    {comment.member.memberId === cookies.user.num &&
                        <button onClick={onDeleteOpen} className="sm:order-last mr-3">
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
                                // onClick={onClick}
                                >
                                    삭제하기
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
            <div className={commentReport ? 'flex' : 'hidden'}>
                <ReComments comment={comment} />
            </div>
        </div>
    )
}

export default CommentList