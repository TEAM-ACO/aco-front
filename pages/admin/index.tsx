import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import AdminMenu from './AdminMenu'
import { useAppDispatch } from '@store/config'
import { adminVisitant } from '@actions/admin'
import Select, { ActionMeta, SingleValue } from 'react-select';
import AdminGraph from './AdminGraph'

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
    const [selectedOption, setSelectedOption] = useState<IOptions | any>(options[0]);

    useEffect(() => {
        dispatch(adminVisitant({ week: selectedOption.value }))
    }, [])

    return (
        <AdminMenu>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell className="!p-4">
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
                {/* <AdminGraph /> */}
            </Table>
            <Select
                instanceId="long-value-select"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </AdminMenu>
    )
}

export default Visitant