import React from 'react'
import { Table } from 'flowbite-react'

const VisitorInfo = ({ content }) => {
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.thisWeekVisitor}
                </Table.Cell>
                <Table.Cell>
                    {content.dayOfVisitor}
                </Table.Cell>
                <Table.Cell>
                    {content.prevLinkWithSum}
                </Table.Cell>
                <Table.Cell>
                    {content.visitedArticle}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    )
}

export default VisitorInfo