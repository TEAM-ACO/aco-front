import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminReportMemberComponent from './AdminReportMember'
import { Table } from 'flowbite-react'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminMemberReport } from '@actions/admin'
import { IAdminMemberReport } from '@features/adminSlice'
import { useRouter } from 'next/router'

const AdminReportMember = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { pid } = router.query;
    const { adminMemberReportContent, adminMemberReportLoading } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(Number(pid));
    const [postsLimit, setPostsLimit] = useState(10);
    const numPages = [];
    for (let i = 1; i <= Math.ceil(
        adminMemberReportContent[adminMemberReportContent.length - 1]?.totalCount / postsLimit); i++) {
        numPages.push(i);
    }

    const onPrevButton = useCallback(() => {
        setRequestPage(requestPage - 1);
        router.replace(`/admin/reportmember/${requestPage - 1}`)
    }, [requestPage])

    const onNextButton = useCallback(() => {
        setRequestPage(requestPage + 1);
        router.replace(`/admin/reportmember/${requestPage + 1}`)
    }, [requestPage])

    useEffect(() => {
        if (!adminMemberReportLoading) {
            dispatch(adminMemberReport({ requestedPageNumber: Number(pid) - 1, requestedPageSize: postsLimit }))
        }
    }, [])

    return (
        <AdminMenu>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
                    </Table.HeadCell>
                    <Table.HeadCell>
                        User Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Nickname
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        ????
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                </Table.Head>
                {adminMemberReportContent.map((content: IAdminMemberReport) => {
                    return (
                        <AdminReportMemberComponent key={content.userReportId} content={content} />
                    )
                })
                }
            </Table>
            <nav aria-label="Page navigation example">
                <div className="inline-flex items-center justify-center w-full mt-3 -space-x-px font-medium">
                    <a
                        href={`/admin/reportmember/${requestPage}`}
                        className={`"block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            ${requestPage === 1 ? 'hidden' : 'block'}`}
                        onClick={onPrevButton}
                    >
                        {requestPage !== 1 ?
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            :
                            <></>
                        }
                    </a>
                    {numPages.map((number, i) => {
                        return (
                            <a
                                href={`/admin/reportmember/${number}`}
                                className={`${number === Number(pid) ? "px-3 py-2 leading-tight border z-10 text-blue-600  border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "px-3 py-2 leading-tight border text-gray-500 bg-white  border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}
                                key={number}
                                onClick={() => {
                                    setRequestPage(number);
                                }}
                            >
                                {number}
                            </a>
                        )
                    })}
                    <a
                        href={`/admin/reportmember/${requestPage}`}
                        onClick={onNextButton}
                        className={`${requestPage === Math.ceil(adminMemberReportContent[0]?.totalCount / postsLimit) ? 'hidden' : 'block'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        <span className="sr-only">Next</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </nav>
        </AdminMenu>
    )
}

export default AdminReportMember