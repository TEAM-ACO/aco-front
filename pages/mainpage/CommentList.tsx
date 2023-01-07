import React, { useState, useCallback, useRef } from 'react'
import { Avatar, Modal, Button } from 'flowbite-react'
import dayjs from 'dayjs';
import { IReply } from '@features/postSlice';

type CommentProps = {
    comment: IReply
}

function CommentList({ comment }: CommentProps) {
    const date = dayjs(comment.date).format("YY-MM-DD");

    const selectBox = useRef() as React.MutableRefObject<HTMLSelectElement>

    const [commentReport, setCommentReport] = useState<boolean>(false);
    const [onReportModal, setOnReportModal] = useState<boolean>(false);
    const [commentDelete, setCommentDelete] = useState<boolean>(false);
    const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);

    const reportTests: string[] = ["부적절한 콘텐츠입니다", "성적인 콘텐츠입니다.", "진실을 오도하고 있습니다",
        "증오 또는 악의적인 콘텐츠입니다.", "권리를 침해하고 있습니다.", "테러를 조장하고 있습니다.", "폭력적인 콘텐츠입니다."]

    const onCommentModalOpen = useCallback(() => {
        setOnReportModal((prev) => !prev)
    }, [])

    const onReportModalClose = useCallback(() => {
        setOnReportModal((prev) => !prev)
        setCommentReport(false)
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
                    {/* 누르면 프로필로 가게 할 것 */}
                    <button className='pr-2'>
                        <div className='w-10'>
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                            />
                        </div>
                    </button>
                    <div className='mr-5 w-10'>
                        <button className="text-sm font-medium text-gray-900 dark:text-white">{comment.member.nickname}</button>
                    </div>
                    <div className="text-sm break-words font-normal text-gray-500 lex dark:text-gray-300">
                        {comment.replyContext}
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600">
                    <time className="mr-3 text-xs font-normal text-gray-400 sm:mb-0">
                        {date}
                    </time>
                    <button onClick={onCommentModalOpen} className="sm:order-last mr-3">
                        신고
                    </button>
                    <button onClick={onDeleteOpen} className="sm:order-last mr-3">
                        삭제
                    </button>
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
                <Modal
                    show={onReportModal}
                    size="md"
                    onClose={onReportModalClose}
                >
                    <Modal.Header>
                        댓글 신고하기
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="report"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    신고사유
                                </label>
                                <select
                                    ref={selectBox}
                                    id="report"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={''} disabled>신고사유를 선택해주세요</option>
                                    {reportTests.map((v, i) => <option key={i} value={i}>{v}</option>)}
                                </select>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                허위 신고시 불이익을 받을 수 있습니다.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>
                            신고하기
                        </Button>
                        <Button
                            color="gray"
                            onClick={onReportModalClose}
                        >
                            아니요
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default CommentList