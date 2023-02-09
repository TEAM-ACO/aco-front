import { IRecentArticleContent } from '@typings/db'
import { Table } from 'flowbite-react'
import React from 'react'

type contentProps = {
    content: IRecentArticleContent
}

// 의논중

const RecentArticle = ({ content }: contentProps) => {
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.articleId}
                </Table.Cell>
                <Table.Cell>
                    {content.articleContext}
                </Table.Cell>
                <Table.Cell>
                    {content.menu}
                </Table.Cell>
                <Table.Cell>
                    {content.member.email}
                </Table.Cell> */}
            </Table.Row>
        </Table.Body>
    )
}

export default RecentArticle