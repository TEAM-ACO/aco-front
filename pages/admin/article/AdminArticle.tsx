import { IAdminArticle } from '@features/adminSlice'
import { Table } from 'flowbite-react'
import React from 'react'

type ContentProps = {
    content: IAdminArticle
}

const AdminArticleComponent = ({ content }: ContentProps) => {
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.articleContext}
                </Table.Cell>
                <Table.Cell>
                    {content.member.email}
                </Table.Cell>
                <Table.Cell>
                    {content.menu}
                </Table.Cell>
                <Table.Cell>
                    {content.articleId}
                </Table.Cell>
                <Table.Cell>
                    {content.reported}
                </Table.Cell>
                <Table.Cell>
                    <button
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                        삭제
                    </button>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    )
}

export default AdminArticleComponent