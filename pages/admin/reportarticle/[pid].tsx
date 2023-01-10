import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminReportArticleComponent from './AdminReportArticle'
import { Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminArticleReport } from '@actions/admin'
import { IAdminArticleReport } from '@features/adminSlice'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const AdminReportArticle = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { pid } = router.query;
    const { adminArticleReportContent, adminArticleReportLoading } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(Number(pid));
    const [postsLimit, setPostsLimit] = useState(10);
    const numPages = [];
    for (let i = 1; i <= Math.ceil(
        adminArticleReportContent[adminArticleReportContent.length - 1]?.totalCount / postsLimit); i++) {
        numPages.push(i);
    }

    const onPrevButton = useCallback(() => {
        setRequestPage(requestPage - 1);
        router.replace(`/admin/reportarticle/${requestPage - 1}`)
    }, [requestPage])

    const onNextButton = useCallback(() => {
        setRequestPage(requestPage + 1);
        router.replace(`/admin/reportarticle/${requestPage + 1}`)
    }, [requestPage])

    useEffect(() => {
        if (!adminArticleReportLoading) {
            dispatch(adminArticleReport({ requestedPageNumber: Number(pid) - 1, requestedPageSize: postsLimit }))
        }
    }, [])
    return (
        <AdminMenu>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
                    </Table.HeadCell>
                    <Table.HeadCell>
                        num
                    </Table.HeadCell>
                    <Table.HeadCell>
                        articleReportContext
                    </Table.HeadCell>
                    <Table.HeadCell>
                        articleId
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                </Table.Head>
                {adminArticleReportContent.map((content: IAdminArticleReport) => {
                    return (
                        <AdminReportArticleComponent key={content.articleReportId} content={content} />
                    )
                })
                }
            </Table>
            <nav aria-label="Page navigation example">
                <div className="inline-flex items-center justify-center w-full mt-3 -space-x-px font-medium">
                    <a
                        href={`/admin/reportarticle/${requestPage}`}
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
                                href={`/admin/reportarticle/${number}`}
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
                        href={`/admin/reportarticle/${requestPage}`}
                        onClick={onNextButton}
                        className={`${requestPage === Math.ceil(adminArticleReportContent[0]?.totalCount / postsLimit) ? 'hidden' : 'block'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log(req.headers);

    await store.dispatch(adminArticleReport());

    return { props: {} }
})

export default AdminReportArticle