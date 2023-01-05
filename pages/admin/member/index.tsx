import React, { useEffect, useCallback, useState } from 'react'
import AdminMenu from '../AdminMenu'
import AdminMemberComponent from './AdminMember'
import { Table } from 'flowbite-react'
import wrapper, { useAppDispatch, useAppSelector } from '@store/config'
import { adminMember } from '@actions/admin'
import { IAdmin } from '@features/adminSlice'
import { GetServerSideProps } from 'next'

const AdminMember = () => {
    const dispatch = useAppDispatch();
    const { adminContent } = useAppSelector((state) => state.admin)
    const { adminMemberLoading } = useAppSelector((state) => state.admin);
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])


    useEffect(() => {
        if (!adminMemberLoading) {
            dispatch(adminMember({ requestedPageNumber: requestPage, requestedPageSize: 10 }))
            loadMore();
        }
    }, [requestPage])

    return (
        <AdminMenu>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Member Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Nickname
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                </Table.Head>
                {adminContent.map((content: IAdmin) => {
                    return (
                        <AdminMemberComponent key={content.email} content={content} />
                    )
                })
                }
            </Table>
        </AdminMenu>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log(req.headers);
    await store.dispatch(adminMember());

    return { props: {} }
})

export default AdminMember