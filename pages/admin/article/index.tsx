import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminArticleComponent from './AdminArticle'
import { Pagination, Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminArticle } from '@actions/admin'
import { IAdminArticle } from '@features/adminSlice'
import { GetServerSideProps } from 'next'

const AdminArticle = () => {
    const dispatch = useAppDispatch();
    const { adminContent, adminArticleDone } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(0);

    const onPageChange = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])

    useEffect(() => {
        dispatch(adminArticle({ requestedPageNumber: requestPage, requestedPageSize: 10 }))
    }, [])
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
            <Pagination
                currentPage={1}
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={100}
            />
        </AdminMenu>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log('getServerSideProps start');
    console.log(req.headers);

    await store.dispatch(adminArticle());

    return { props: {} }
})

export default AdminArticle