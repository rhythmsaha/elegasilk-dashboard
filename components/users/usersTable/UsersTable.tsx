import { Avatar, Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { FC } from 'react';
import moment from 'moment';
import TableHeaderCol, { IColumn } from './TableHeaderCol';

interface Props {
    usersData: any[];
    sortBy: string;
    sortOrder: string;
    changeSortHandler: (key: string) => void;
}

export interface IUserTableData {
    _id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    phone: string;
    role: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    avatar: string;
}

const statusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    inactive: 'danger',
};

function formatDateOrTime(date: string) {
    const inputDate = moment(date);
    return inputDate.format('YYYY-MM-DD');
}

const columns: IColumn[] = [
    { label: 'Name', key: 'fullName', sortable: true },
    { label: 'Phone', key: 'phone', sortable: true },
    { label: 'Role', key: 'role', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
    { label: 'Created', key: 'createdAt', sortable: true },
    { label: 'Updated', key: 'updatedAt', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const UsersTable: FC<Props> = ({ usersData, changeSortHandler, sortBy, sortOrder }) => {
    return (
        <div className="overflow-x-auto pb-2">
            <Table
                aria-label="Users list table"
                removeWrapper
                classNames={{
                    th: 'px-4 md:px-4 py-3 md:py-4 text-sm font-semibold text-default-800',
                    td: 'px-4 md:px-4 py-3 md:py-4 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl',
                    tr: 'hover:bg-default-50 border-b border-default-100 border-dashed',
                }}
            >
                <TableHeader className="">
                    {columns.map((column) => (
                        <TableColumn className="" key={column.key}>
                            <TableHeaderCol changeSortHandler={changeSortHandler} column={column} sortBy={sortBy} sortOrder={sortOrder} />
                        </TableColumn>
                    ))}
                </TableHeader>

                <TableBody>
                    {usersData.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar src={user.avatar} size="md" />
                                    <div>
                                        <p>{user.fullName}</p>

                                        <span className="mt-2">@{user.username}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.phone || '-'}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Chip variant="flat" size="sm" color={statusColorMap[user.status ? 'active' : 'inactive']}>
                                    {user.status ? 'Active' : 'Inactive'}
                                </Chip>
                            </TableCell>
                            <TableCell>{formatDateOrTime(user.createdAt)}</TableCell>

                            <TableCell>{formatDateOrTime(user.updatedAt)}</TableCell>
                            <TableCell>test</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
