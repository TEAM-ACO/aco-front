import React, { useEffect, useCallback, useState } from 'react'
import AdminMenu from '../../../components/AdminMenu'
import AdminMemberComponent from '../../../components/AdminMember'
import { Table } from 'flowbite-react'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminMember } from '@actions/admin'
import { IAdmin } from '@features/adminSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AdminMember = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { pid } = router.query;
    const { adminMemberContent, adminMemberLoading } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(Number(pid));
    const [postsLimit, setPostsLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const numPages = [];
    for (let i = 1; i <= Math.ceil(adminMemberContent[adminMemberContent.length - 1]?.totalCount / postsLimit); i++) {
        numPages.push(i);
    }

    const onPrevButton = useCallback(() => {
        setRequestPage(requestPage - 1);
        router.replace(`/admin/member/${requestPage - 1}`)
    }, [requestPage])

    const onNextButton = useCallback(() => {
        setRequestPage(requestPage + 1);
        router.replace(`/admin/member/${requestPage + 1}`)
    }, [requestPage])

    useEffect(() => {
        setTotal(adminMemberContent[adminMemberContent.length - 1]?.totalCount || 0)
    }, [total])

    const [hasMorePost, setHasMorePost] = useState<boolean>(true);

    useEffect(() => {
        if (!adminMemberLoading && hasMorePost) {
            setHasMorePost(false)
            dispatch(adminMember({ requestedPageNumber: Number(pid) - 1, requestedPageSize: postsLimit }))
        }
    }, [adminMemberLoading, hasMorePost])

    return (
        <>
            <Head>
                <title>멤버관리 페이지 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            </Head>
            <AdminMenu>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Num
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Nickname
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Member Email
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                        </Table.HeadCell>
                    </Table.Head>
                    {adminMemberContent.map((content: IAdmin) => {
                        return (
                            <AdminMemberComponent key={content.email} content={content} />
                        )
                    })
                    }
                </Table>
                <nav aria-label="Page navigation example">
                    <div className="inline-flex items-center justify-center w-full mt-3 -space-x-px font-medium">
                        <a
                            href={`/admin/member/${requestPage}`}
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
                                    href={`/admin/member/${number}`}
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
                            href={`/admin/member/${requestPage}`}
                            onClick={onNextButton}
                            className={`${requestPage === Math.ceil(adminMemberContent[0]?.totalCount / postsLimit) ? 'hidden' : 'block'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </AdminMenu>
        </>
    )
}

export default AdminMember