import React, { useCallback, useState, useEffect } from 'react'
import { adminDelete } from '@actions/admin'
import { IAdminArticle } from '@features/adminSlice'
import { useAppDispatch } from '@store/config'
import { Table } from 'flowbite-react'
import { useRouter } from 'next/router'

type ContentProps = {
    content: IAdminArticle
}

const AdminArticleComponent = ({ content }: ContentProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [articleId, setArticleId] = useState<number>();
    const [menu, setMenu] = useState<string>();
    const [memberEmail, setMemberEmail] = useState<string>();
    const [articleContext, setArticleContext] = useState<string>();
    const [reported, setReported] = useState<number>();

    const onDelete = useCallback(() => {
        const refresh: any = router.reload
        dispatch(adminDelete({ which: "article", number: content.articleId }))
        refresh(window.location.pathname)
    }, [])

    useEffect(() => {
        if (content.member === undefined) return
        setArticleId(content.articleId)
        setMenu(content.menu)
        setMemberEmail(content.member.email)
        setArticleContext(content.articleContext)
        setReported(content.reported)
    }, [])

    return (
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {articleId}
                </Table.Cell>
                <Table.Cell>
                    {content.menu}
                </Table.Cell>
                <Table.Cell>
                    {memberEmail}
                </Table.Cell>
                <Table.Cell>
                    {articleContext}
                </Table.Cell>
                <Table.Cell>
                    {reported}
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

export default AdminArticleComponent