import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import AdminMenu from './AdminMenu'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminVisitant } from '@actions/admin'
import Select, { ActionMeta, SingleValue } from 'react-select';
import VisitorInfo from './VisitorInfo';
import RecentMember from './RecentMember'
import RecentArticle from './RecentArticle'
import Head from 'next/head'
import { IRecentArticleContent, IRecentMemberContent } from '@typings/db'

const options = [
    { value: 1, label: '1주일' },
    { value: 2, label: '2주일' },
    { value: 4, label: '4주일' },
    { value: 12, label: '12주일' },
];

type IOptions = {
    value: number;
    label: string;
    onChange?: ((option: SingleValue<IOptions> | null, actionMeta: ActionMeta<IOptions>) => void) | undefined
}

const Visitant = () => {
    const dispatch = useAppDispatch();
    const { adminContent } = useAppSelector((state) => state.admin)
    const [selectedOption, setSelectedOption] = useState<IOptions | any>(options[0]);

    // 주 선택하고 버튼 만들기
    useEffect(() => {
        dispatch(adminVisitant({ week: selectedOption.value }))
    }, [selectedOption.value])

    // chart 의논

    return (
        <>
            <Head>
                <title>관리자페이지 | Project ACO</title>
            </Head>
            <AdminMenu>
                <Select
                    instanceId="long-value-select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                {/* <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            visitors
                        </Table.HeadCell>
                        <Table.HeadCell>
                            day of visitor
                        </Table.HeadCell>
                        <Table.HeadCell>
                            prevlink with sum
                        </Table.HeadCell>
                        <Table.HeadCell>
                            visited article
                        </Table.HeadCell>
                    </Table.Head>
                </Table> */}
                <VisitorInfo select={selectedOption.value} />
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            memberid
                        </Table.HeadCell>
                        <Table.HeadCell>
                            email
                        </Table.HeadCell>
                        <Table.HeadCell>
                            nickname
                        </Table.HeadCell>
                        <Table.HeadCell>
                            joindate
                        </Table.HeadCell>
                    </Table.Head>
                    {adminContent[0]?.map((content: IRecentMemberContent) => {
                        return (
                            <RecentMember key={content.memberId} content={content} />
                        )
                    })
                    }
                </Table>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            articleid
                        </Table.HeadCell>
                        <Table.HeadCell>
                            article context
                        </Table.HeadCell>
                        <Table.HeadCell>
                            menu
                        </Table.HeadCell>
                        <Table.HeadCell>
                            member
                        </Table.HeadCell>
                    </Table.Head>
                    {adminContent[1]?.map((content: IRecentArticleContent) => {
                        return (
                            <RecentArticle key={content.articleId} content={content} />
                        )
                    })
                    }
                </Table>
            </AdminMenu>
        </>
    )
}

export default Visitant