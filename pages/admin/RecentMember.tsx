import React from 'react'
import { Table } from 'flowbite-react'

const RecentMember = ({ content }) => {
    console.log(content)
    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.memberId}
                </Table.Cell>
                <Table.Cell>
                    {content.email}
                </Table.Cell>
                <Table.Cell>
                    {content.nickname}
                </Table.Cell>
                <Table.Cell>
                    {content.joindate}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    )
}

export default RecentMember