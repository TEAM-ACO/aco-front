import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import AdminMenu from './AdminMenu'
import { useAppDispatch, useAppSelector } from '@store/config'
import { adminVisitant } from '@actions/admin'
import Select, { ActionMeta, SingleValue } from 'react-select';
import VisitorInfo from './VisitorInfo';
import RecentMember from './RecentMember'
import RecentArticle from './RecentArticle'

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

    const [member, setMember] = useState('')

    useEffect(() => {
        dispatch(adminVisitant({ week: selectedOption.value }))
    }, [selectedOption])

    // useEffect(() => {
    //     setMember(adminContent[0]?.recentArticle[0].articleId)
    // })

    // 최근 게시글 (내용, 메뉴, member 이런거 정도만)
    // 방문자 (이번주, 오늘, 아이디, 방문 게시글)
    // 최근 가입자 카테고리 (맨 밑)

    return (
        <AdminMenu>
            <Select
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
                {/* {adminContent.map((content) => {
                    return (
                        <RecentArticle key={content.memberId} content={content} />
                    )
                })
                } */}
            </Table>
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
                {/* <VisitorInfo content={adminContent[0]} /> */}
            </Table>
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
                {/* {member.map((content) => {
                    return (
                        <RecentMember key={content.memberId} content={content} />
                    )
                })
                } */}
            </Table>
        </AdminMenu>
    )
}

export default Visitant