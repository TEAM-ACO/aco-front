import React, { useState, useEffect } from 'react'
import { Table } from 'flowbite-react'
import { IWeek } from '@typings/db'
// import Info from './info'
import { useAppDispatch, useAppSelector } from '@store/config'
import { visitor } from '@actions/admin'

// 백엔드와 차트 구현법 협의중 보류

type contentProps = {
    select: any
}

const VisitorInfo = ({ select }: contentProps) => {
    const dispatch = useAppDispatch();
    const { adminVisitor } = useAppSelector((state) => state.admin)
    // const visitor = dayOfVisitor
    // const prevLink = prevLinkWithSum
    // const visited = visitedArticle

    // console.log(adminVisitor[0])

    useEffect(() => {
        dispatch(visitor({ week: select }))
    }, [])

    return (
        <>
            {/* {adminVisitor[0].thisWeekVisitor}
            {Object.keys(adminVisitor[0].dayOfVisitor)}:
            {Object.values(adminVisitor[0].dayOfVisitor)}
            {Object.keys(adminVisitor[0].prevLinkWithSum)}:
            {Object.values(adminVisitor[0].prevLinkWithSum)} */}
            {/* {adminVisitor[0].visitedArticle} */}
            {/* {adminVisitor.map((visitorInfo, i) => {
                return (
                    <Info key={i} visitorInfo={visitorInfo} />
                )
            })} */}
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