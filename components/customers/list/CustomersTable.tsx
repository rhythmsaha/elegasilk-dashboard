import TableHeaderCol, { IColumn } from '@/components/users/usersTable/TableHeaderCol';
import { ICustomerTableData } from '@/sections/customers/CustomersSection';
import formatTimestamp from '@/utils/formatTimestamp';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import NameCell from './cells/NameCell';
import ActionCell from './cells/ActionCell';

interface Props {
    customersData: ICustomerTableData[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    changeSortHandler: (key: string) => void;
    onDelete: (customerId: string) => void;
    refetch: () => void;
}

const columns: IColumn[] = [
    { label: 'Name', key: 'firstName', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Verified', key: 'verified', sortable: true },
    { label: 'Created At', key: 'createdAt', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const CustomersTable: React.FC<Props> = ({ customersData, sortBy, sortOrder, changeSortHandler, onDelete, refetch }) => {
    return (
        <div className="mt-6 overflow-x-auto pb-2">
            <Table
                aria-label="Collections table"
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
                    {customersData.map((customer, index) => (
                        <TableRow className={`text-gray-600`} key={customer._id}>
                            <TableCell className="capitalize">
                                <NameCell firstName={customer.firstName} lastName={customer.lastName} />
                            </TableCell>

                            <TableCell>
                                <p className="">{customer.email}</p>
                            </TableCell>

                            <TableCell className="">
                                <p className="">{customer.verified ? 'Verified' : 'Not Verified'}</p>
                            </TableCell>

                            <TableCell>
                                <p className="">{formatTimestamp(customer.createdAt!)}</p>
                            </TableCell>

                            <TableCell>
                                <p className="">{customer.status ? 'Active' : 'Inactive'}</p>
                            </TableCell>

                            <TableCell>
                                <ActionCell refetch={refetch} customerId={customer._id} customerStatus={customer.status} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomersTable;
