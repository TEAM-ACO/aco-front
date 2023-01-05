import React, { useCallback } from 'react'
import { IAdmin } from '@features/adminSlice'
import { useAppDispatch } from '@store/config'
import { Table } from 'flowbite-react'
import { adminDelete } from '@actions/admin'

type ContentProps = {
    content: IAdmin
}

const AdminMemberComponent = ({ content }: ContentProps) => {
    const dispatch = useAppDispatch();

    const onDelete = useCallback(() => {
        dispatch(adminDelete({ which: "member" }))
    }, [])
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="truncate whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.email}
                </Table.Cell>
                <Table.Cell>
                    {content.nickname}
                </Table.Cell>
                <Table.Cell>
                    {content.name}
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

export default AdminMemberComponent