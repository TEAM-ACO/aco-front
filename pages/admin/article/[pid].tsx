import React, { useState, useEffect, useCallback } from 'react'
import AdminMenu from '../../../app/AdminMenu'
import AdminArticleComponent from '../../../app/AdminArticle'
import { Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminArticle } from '@actions/admin'
import { IAdminArticle } from '@features/adminSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

const AdminArticle = () => {
    // total 받으면 마지막 화살표 없애는 식 만들 것
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { pid } = router.query;
    const { adminArticleContent, adminArticleLoading } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(Number(pid));
    const [hasMorePost, setHasMorePost] = useState<boolean>(true);
    const [postsLimit, setPostsLimit] = useState(10);
    const numPages = [];
    for (let i = 1; i <= Math.ceil(adminArticleContent[adminArticleContent.length - 1]?.totalCount / postsLimit); i++) {
        numPages.push(i);
    }

    const onPrevButton = useCallback(() => {
        setRequestPage(requestPage - 1);
        router.replace(`/admin/article/${requestPage - 1}`)
    }, [requestPage])

    const onNextButton = useCallback(() => {
        setRequestPage(requestPage + 1);
        router.replace(`/admin/article/${requestPage + 1}`)
    }, [requestPage])

    useEffect(() => {
        if (!adminArticleLoading && hasMorePost) {
            dispatch(adminArticle({ requestedPageNumber: requestPage - 1, requestedPageSize: 10 }))
            setHasMorePost(false)
        }
    }, [adminArticleLoading, hasMorePost])
    return (
        <>
            <Head>
                <title>게시글관리 페이지 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Admin Article page" />
                <meta name="keywords" content="ArticleAdmin" />
                <meta property="og:image" content="/favicon.png" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
                <meta property="og:title" content="게시글관리 페이지 | Project ACO" />
                <meta property="og:description" content="Admin Article page" />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <AdminMenu>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            num
                        </Table.HeadCell>
                        <Table.HeadCell>
                            menu
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Member email
                        </Table.HeadCell>
                        <Table.HeadCell className='truncate'>
                            Article Contents
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Reported
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                        </Table.HeadCell>
                    </Table.Head>
                    {adminArticleContent.map((content: IAdminArticle) => {
                        return (
                            <AdminArticleComponent key={content.articleId} content={content} />
                        )
                    })
                    }
                </Table>
                <nav aria-label="Page navigation example">
                    <div className="inline-flex items-center justify-center w-full mt-3 -space-x-px font-medium">
                        <a
                            href={`/admin/article/${requestPage}`}
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
                                    href={`/admin/article/${number}`}
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
                            href={`/admin/article/${requestPage}`}
                            onClick={onNextButton}
                            className={`${requestPage === Math.ceil(adminArticleContent[0]?.totalCount / postsLimit) ? 'hidden' : 'block'} block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    await store.dispatch(adminArticle());

    return { props: { message: 'Success SSR' } }
})

export default AdminArticle