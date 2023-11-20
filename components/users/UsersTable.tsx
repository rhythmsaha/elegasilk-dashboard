import {
    Avatar,
    Chip,
    ChipProps,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    usersData: any[];
}

const statusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    inactive: 'danger',
};

const UsersTable: FC<Props> = ({ usersData }) => {
    return (
        <div className="overflow-x-auto">
            <Table
                removeWrapper
                classNames={{
                    th: 'px-4 md:px-4 py-3 md:py-4 text-sm font-semibold text-default-800',
                    td: 'px-4 md:px-4 py-3 md:py-4 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl',
                    tr: 'hover:bg-default-50 border-b border-default-100 border-dashed',
                }}
                aria-label="Users list table"
            >
                <TableHeader className="">
                    <TableColumn className="">Name</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Created At</TableColumn>
                    <TableColumn>Updated At</TableColumn>
                </TableHeader>

                <TableBody>
                    {usersData.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar src={user.avatar} size="md" />
                                    <div>
                                        <p>
                                            {user.first_name} {user.last_name}
                                        </p>

                                        <span className="mt-2">
                                            @{user.username}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Chip
                                    variant="flat"
                                    size="sm"
                                    color={
                                        statusColorMap[
                                            user.status ? 'active' : 'inactive'
                                        ]
                                    }
                                >
                                    {user.status ? 'Active' : 'Inactive'}
                                </Chip>
                            </TableCell>
                            <TableCell>{user.createdAt}</TableCell>

                            <TableCell>{user.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
