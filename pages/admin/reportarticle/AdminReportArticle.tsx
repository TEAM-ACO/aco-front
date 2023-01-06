import { adminDelete } from '@actions/admin'
import { IAdminArticleReport } from '@features/adminSlice'
import { useAppDispatch } from '@store/config'
import { Table } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

type ContentProps = {
    content: IAdminArticleReport
}

const AdminReportArticleComponent = ({ content }: ContentProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const onDelete = useCallback(() => {
        const refresh: any = router.reload
        dispatch(adminDelete({ which: "articlereport", number: content.articleReportId }))
        refresh(window.location.pathname)
    }, [])
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.articleReportId}
                </Table.Cell>
                <Table.Cell>
                    {content.articleReportContext}
                </Table.Cell>
                <Table.Cell>
                    {content.articleId}
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

export default AdminReportArticleComponent