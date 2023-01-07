import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminReportArticleComponent from './AdminReportArticle'
import { Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminArticleReport } from '@actions/admin'
import { IAdminArticleReport } from '@features/adminSlice'
import { GetServerSideProps } from 'next'

const AdminReportArticle = () => {
    const dispatch = useAppDispatch();
    const { adminContent } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        dispatch(adminArticleReport({ requestedPageNumber: requestPage, requestedPageSize: 10 }))
        loadMore();
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
                {adminContent.map((content: IAdminArticleReport) => {
                    return (
                        <AdminReportArticleComponent key={content.articleReportId} content={content} />
                    )
                })
                }
            </Table>
        </AdminMenu>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log(req.headers);

    await store.dispatch(adminArticleReport());

    return { props: {} }
})

export default AdminReportArticle