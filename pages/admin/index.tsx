import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import AdminMenu from '../../app/AdminMenu'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminVisitant } from '@actions/admin'
import Select, { ActionMeta, SingleValue } from 'react-select';
import VisitorInfo from './VisitorInfo';
import RecentMember from './RecentMember'
import RecentArticle from '../../app/RecentArticle'
import Head from 'next/head'
import { IRecentArticleContent, IRecentMemberContent } from '@typings/db'
import { useRouter } from 'next/router'

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { adminContent } = useAppSelector((state) => state.admin)
    const [selectedOption, setSelectedOption] = useState<IOptions | any>(options[0]);

    useEffect(() => {
        // 작업 의논중
        // dispatch(adminVisitant({ week: selectedOption.value }))
    }, [selectedOption.value])

    useEffect(() => {
        // 수정중 /admin에 접근방지
        router.replace('/admin/member/1')
    }, [])

    // chart 작업 의논중

    return (
        <>
            <Head>
                <title>관리자페이지 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Admin page" />
                <meta name="keywords" content="Admin" />
                <meta property="og:title" content="관리자페이지 | Project ACO" />
            </Head>
            <AdminMenu>
                {/* 이 파트 의논중 */}
                {/* <Select
                    instanceId="long-value-select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                <Table hoverable={true}>
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
                {/* <VisitorInfo select={selectedOption.value} />
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
                </Table> */}
            </AdminMenu>
        </>
    )
}

export default Visitant