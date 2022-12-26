import { Modal, Button } from 'flowbite-react';
import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem';
import React, { useCallback, useState, useRef, DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { reportArticle, reportPost } from '../../actions/post';
import { useAppDispatch } from '@store/config'
const Dropdown = ({ post }:any) => {
    const [postCardDropdown, setPostCardDropdown] = useState<boolean>(false);
    const [onReportModal, setOnReportModal] = useState<boolean>(false);
    const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);
    const [isReported, setIsReported] = useState<Boolean>(false)
    const [wrongReportRequest, setWrongReportRequest] = useState<Boolean>(false)
    const selectBox = useRef<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>>()
    const dispatch = useAppDispatch();
    const reportTests : string[] = ["부적절한 콘텐츠입니다", "넣을거 없나", "진실을 오도하고 있습니다"]
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

    const onReportModalSubmit = useCallback(()=>{
        const data : reportArticle = {
            articlereporterId : 1, //쿠키에서 가져오기,
            articleId : post.articleId,
            articleReportContext:reportTests[selectBox.current?.value as unknown as number]
        } 
        console.log(data);
        dispatch(reportPost({...data})).then(res=>{
            switch (res.payload) {
                case 1:
                    onReportModalClose()
                    break;
                case -1:
                    setIsReported(true)
                    setTimeout(onReportModalClose, 3000)
                case 2:
                    //예외모달필요
                default:
                    break;
            }   
        })
    }, [])

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
                                <a href="#" className="block py-2 pl-3.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    수정하기
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={onDeleteOpen}
                                    className="flex justify-start w-full py-2 pl-3.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    삭제하기
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={onReportModalOpen}
                                    className="flex justify-start w-full py-2 pl-3.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    신고하기
                                </button>
                            </li>
                        </ul>
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
                                                {reportTests.map((v, i)=> <option value={i}>{v}</option>)}
                                            </select>
                                        </div>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                        </p>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                    onClick={onReportModalSubmit}
                                    disabled={isReported==true}>
                                        신고하기
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={onReportModalClose}
                                    >
                                        아니요
                                    </Button>
                                    {isReported&&<span className='text-red-500'>이미 신고한 게시글입니다.<br></br> 잠시후 종료됩니다</span>}
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