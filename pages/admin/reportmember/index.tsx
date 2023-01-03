import React, { useState, useCallback, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import AdminReportMemberComponent from './AdminReportMember'
import { Table } from 'flowbite-react'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminMemberReport } from '@actions/admin'
import { IAdminMemberReport } from '@features/adminSlice'

const AdminReportMember = () => {
    const dispatch = useAppDispatch();
    const { adminContent } = useAppSelector((state) => state.admin)
    const [requestPage, setRequestPage] = useState<number>(0);

    const loadMore = useCallback(() => {
        setRequestPage(prev => prev + 1);
    }, [requestPage])


    useEffect(() => {
        dispatch(adminMemberReport({ requestedPageNumber: requestPage, requestedPageSize: 5 }))
        loadMore();
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
                {adminContent.map((content: IAdminMemberReport) => {
                    return (
                        <AdminReportMemberComponent key={content.userReportId} content={content} />
                    )
                })
                }
            </Table>
        </AdminMenu>
    )
}

export default AdminReportMember