import React from 'react'
import { Table, Checkbox } from 'flowbite-react'
import AdminMenu from './AdminMenu'

const Visitant = () => {
    return (
        <AdminMenu>
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
                        Delete
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
                            <button
                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                                삭제
                            </button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </AdminMenu>
    )
}

export default Visitant