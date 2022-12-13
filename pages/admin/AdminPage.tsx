import React from 'react'
import { Table, Checkbox } from 'flowbite-react'

function AdminPage() {
    return (
        <div>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
                        <Checkbox />
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
                        <span className="sr-only">
                            Edit
                        </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="!p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            CodeMaster_B-HS@hanmail.net
                        </Table.Cell>
                        <Table.Cell>
                            B-HS
                        </Table.Cell>
                        <Table.Cell>
                            변현석
                        </Table.Cell>
                        <Table.Cell>
                            컨텐츠1
                        </Table.Cell>
                        <Table.Cell>
                            <a
                                href="/tables"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="!p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            HelloWorld@hanmail.net
                        </Table.Cell>
                        <Table.Cell>
                            White
                        </Table.Cell>
                        <Table.Cell>
                            Laptop PC
                        </Table.Cell>
                        <Table.Cell>
                            $1999
                        </Table.Cell>
                        <Table.Cell>
                            <a
                                href="/tables"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="!p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Magic Mouse 2
                        </Table.Cell>
                        <Table.Cell>
                            Black
                        </Table.Cell>
                        <Table.Cell>
                            Accessories
                        </Table.Cell>
                        <Table.Cell>
                            $99
                        </Table.Cell>
                        <Table.Cell>
                            <a
                                href="/tables"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>

    )
}

export default AdminPage