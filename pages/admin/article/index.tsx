import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminArticleComponent from './AdminArticle'
import { Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminArticle } from '@actions/admin'
import { IAdminArticle } from '@features/adminSlice'
import { GetServerSideProps } from 'next'
import Pagination from '../Pagination'

const AdminArticle = () => {
    const dispatch = useAppDispatch();
    const { adminContent, adminArticleDone, adminArticleLoading } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(1);
    const limit = 10;

    useEffect(() => {
        if (!adminArticleLoading) {
            dispatch(adminArticle({ requestedPageNumber: requestPage - 1, requestedPageSize: limit }))
        }
    }, [adminArticleLoading])
    return (
        <AdminMenu>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Article Contents
                    </Table.HeadCell>
                    <Table.HeadCell>
                        usermail
                    </Table.HeadCell>
                    <Table.HeadCell>
                        menu
                    </Table.HeadCell>
                    <Table.HeadCell>
                        num
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Reported
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                </Table.Head>
                {adminContent.map((content: IAdminArticle) => {
                    return (
                        <AdminArticleComponent key={content.articleId} content={content} />
                    )
                })
                }
            </Table>
            <Pagination limit={limit} page={requestPage} setPage={setRequestPage} />
        </AdminMenu>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log(req.headers);

    await store.dispatch(adminArticle());

    return { props: {} }
})

export default AdminArticle