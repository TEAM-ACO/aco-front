import React, { useCallback, useState, useRef, DetailedHTMLProps, SelectHTMLAttributes, Dispatch, SetStateAction, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { Modal, Button, Spinner } from 'flowbite-react';
import { deletePost, editPost, reportArticle, reportPost } from '../../actions/post';
import { useAppDispatch, useAppSelector } from '@store/config'
import { IArticle, deletePostToMe } from '@features/postSlice';
import { useRouter } from 'next/router';

type PostProps = {
    post: IArticle
    contextModify: boolean
    setContextModify: Dispatch<SetStateAction<boolean>>
}

const Dropdown = ({ post, contextModify, setContextModify }: PostProps) => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { deletePostDone, deletePostLoading, editPostDone } = useAppSelector((state) => state.post)

    const [editContent, setEditContent] = useState<string>()
    const [onUserText, setOnUserText] = useState<string>()
    const [onUserHTML, setOnUserHTML] = useState<string>()

    const [memberIdCheck, setMemberIdCheck] = useState<number>();
    const [postCardDropdown, setPostCardDropdown] = useState<boolean>(false);
    const [onReportModal, setOnReportModal] = useState<boolean>(false);
    const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);
    const [isReported, setIsReported] = useState<Boolean>(false)
    const selectBox = useRef<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>>()
    const dispatch = useAppDispatch();
    const reportTests: string[] = ["부적절한 콘텐츠입니다", "성적인 콘텐츠입니다.", "진실을 오도하고 있습니다",
        "증오 또는 악의적인 콘텐츠입니다.", "권리를 침해하고 있습니다.", "테러를 조장하고 있습니다.", "폭력적인 콘텐츠입니다."]

    const onTogglePostCardDropdown = useCallback(() => {
        setPostCardDropdown((prev) => !prev)
    }, [])

    const onReportModalOpen = useCallback(() => {
        setOnReportModal((prev) => !prev)
    }, [])

    const onReportModalClose = useCallback(() => {
        setOnReportModal((prev) => !prev)
        setPostCardDropdown(false)
    }, [])

    const onDeleteOpen = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
    }, [])

    const onDeleteClose = useCallback(() => {
        setOnDeleteModal((prev) => !prev)
        setPostCardDropdown(false)
    }, [])

    const onReportModalSubmit = useCallback(() => {
        const data: reportArticle = {
            articlereporterId: 1, //쿠키에서 가져오기,
            articleId: post.articleId,
            articleReportContext: reportTests[selectBox.current?.value as unknown as number]
        }
        console.log(data);
        dispatch(reportPost({ ...data })).then(res => {
            switch (res.payload) {
                case 1:
                    onReportModalClose()
                    break;
                case -1:
                    setIsReported(true)
                    setTimeout(onReportModalClose, 3000)
                case 2:
                    alert('에러로 인해 신고가 완료되지 않았습니다. 잠시후에 다시 시도해주세요.')
                default:
                    break;
            }
        })
    }, [])

    const onEditPost = useCallback(() => {
        setContextModify((prev) => !prev)
    }, [contextModify])

    const onDeleteArticle = useCallback(() => {
        dispatch(deletePost({ articleId: post.articleId }))
        dispatch(deletePostToMe({ articleId: post.articleId }))
        setOnDeleteModal(false)
    }, [deletePostDone])

    useEffect(() => {
        setMemberIdCheck(post.member.memberId)
        if (post.member.memberId === cookies.user?.num) {
            contextModify ? setEditContent('수정취소') : setEditContent('수정하기')
            setOnUserText('삭제하기')
            setOnUserHTML('flex')
        } else if (post.member.memberId !== cookies.user?.num) {
            setOnUserText('신고하기')
            setOnUserHTML('hidden')
        }
    }, [contextModify, onUserText, editContent])

    return (
        <div>
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
                <div className={postCardDropdown ? 'flex relative' : 'hidden relative'}>
                    <div
                        id="dropdownDotsHorizontal"
                        className="z-10 w-20 absolute right-0 top-2
                         bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <button
                                    type="button"
                                    onClick={onEditPost}
                                    className={`${onUserHTML}
                                    "flex justify-start py-2 pl-3.5 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"`}>
                                    {editContent}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={onUserText ? onDeleteOpen : onReportModalOpen}
                                    className="flex justify-start w-full py-2 pl-3.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {onUserText}
                                </button>
                            </li>
                        </ul>
                        {/* <ul>
                                 <li>
                                     <button
                                        onClick={onReportModalOpen}
                                        className="flex justify-start w-full py-2 pl-3.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {onUserText}
                                    </button>
                                </li>
                            </ul> */}
                        <div className="sm h-full flex justify-center items-center">
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
                                            정말로 게시글을 삭제 하시겠습니까?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button
                                                color="failure"
                                                onClick={onDeleteArticle}
                                            >
                                                {deletePostLoading ?
                                                    <Spinner />
                                                    : '삭제하기'
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
                            {/* 신고하기 Modal */}
                            <Modal
                                show={onReportModal}
                                size="md"
                                onClose={onReportModalClose}
                            >
                                <Modal.Header>
                                    게시글 신고하기
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
                                                ref={selectBox as any}
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
                                    <Button
                                        onClick={onReportModalSubmit}
                                        disabled={isReported == true}>
                                        신고하기
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={onReportModalClose}
                                    >
                                        아니요
                                    </Button>
                                    {isReported && <span className='text-red-500'>이미 신고한 게시글입니다.<br></br> 잠시후 종료됩니다</span>}
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown