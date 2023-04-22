import React, { useState, useEffect } from 'react'
import { Table } from 'flowbite-react'
import { IWeek } from '@typings/db'
// import Info from './info'
import { useAppDispatch, useAppSelector } from '@store/config'
import { visitor } from '@actions/admin'

// 백엔드와 차트 구현법 협의중  (구현중입니다.)

const VisitorInfo = () => {
    const dispatch = useAppDispatch();
    const { adminVisitor } = useAppSelector((state) => state.admin)

    useEffect(() => {

    }, [])

    return (
        <>
            
        </>
        // <Table.Body className="divide-y">
        //     <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        //         <Table.Cell className="!p-4">
        //         </Table.Cell>
        //         <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        //             {thisWeekVisitor}
        //         </Table.Cell>
        //         <Table.Cell>
        //             {/* {dayOfVisitor} */}
        //         </Table.Cell>
        //         <Table.Cell>
        //             {/* {prevLinkWithSum} */}
        //         </Table.Cell>
        //         <Table.Cell>
        //             {/* {visitedArticle} */}
        //         </Table.Cell>
        //     </Table.Row>
        // </Table.Body>
    )
}

export default VisitorInfo