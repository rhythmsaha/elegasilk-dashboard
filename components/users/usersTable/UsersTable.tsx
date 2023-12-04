import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { FC } from 'react';
import TableHeaderCol, { IColumn } from './TableHeaderCol';
import NameCell from './tableBody/NameCell';
import { BsDash } from 'react-icons/bs';
import StatusCell from './tableBody/StatusCell';
import RoleCell from './tableBody/RoleCell';
import formatTimestamp from '@/utils/formatTimestamp';
import ActionsCell from './tableBody/ActionsCell';

export interface IUserTableData {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    phone?: string;
    role: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    avatar: string;
}

interface Props {
    usersData: IUserTableData[];
    sortBy: string;
    sortOrder: string;
    changeSortHandler: (key: string) => void;
    onDelete: (userId: string) => void;
}

const columns: IColumn[] = [
    { label: 'Name', key: 'fullName', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Role', key: 'role', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
    { label: 'Created', key: 'createdAt', sortable: true },
    { label: 'Updated', key: 'updatedAt', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const UsersTable: FC<Props> = ({ usersData, changeSortHandler, sortBy, sortOrder, onDelete }) => {
    return (
        <div className="mt-6 overflow-x-auto pb-2">
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
                        <TableRow key={user._id} className={`text-gray-600`}>
                            <TableCell>
                                <NameCell user={user} />
                            </TableCell>

                            <TableCell>{user.email || <BsDash />}</TableCell>

                            <TableCell>
                                <RoleCell role={user.role} />
                            </TableCell>

                            <TableCell>
                                <StatusCell status={user.status} />
                            </TableCell>

                            <TableCell>{formatTimestamp(user.createdAt)}</TableCell>
                            <TableCell>{formatTimestamp(user.updatedAt)}</TableCell>

                            <TableCell>
                                <ActionsCell userId={user._id} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
