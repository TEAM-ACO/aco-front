import React, { useCallback, useEffect, useState } from 'react'
import { IAdminMemberReport } from '@features/adminSlice'
import { useAppDispatch } from '@store/config';
import { Table } from 'flowbite-react'
import { adminDelete } from '@actions/admin';
import { useRouter } from 'next/router';

type ContentProps = {
    content: IAdminMemberReport;
}

const AdminReportMemberComponent = ({ content }: ContentProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [userReportId, setUserReportId] = useState<number>()
    const [userReportContext, setUserReportContext] = useState<string>()
    const [targetUserId, setTargetUserId] = useState<number>()

    const onDelete = useCallback(() => {
        const refresh: any = router.reload
        dispatch(adminDelete({ which: "memberreport", number: content.userReportId }))
        refresh(window.location.pathname)
    }, [])

    useEffect(() => {
        if (content.userReportId === undefined) return
        setUserReportId(content.userReportId)
        setUserReportContext(content.userReportContext)
        setTargetUserId(content.targetUserId)
    }, [])

    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {userReportId}
                </Table.Cell>
                <Table.Cell>
                    {userReportContext}
                </Table.Cell>
                <Table.Cell>
                    {targetUserId}
                </Table.Cell>
                <Table.Cell>
                    <button
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                        onClick={onDelete}
                    >
                        삭제
                    </button>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    )
}

export default AdminReportMemberComponent