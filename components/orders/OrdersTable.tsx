import React from 'react';
import TableHeaderCol, { IColumn } from '../users/usersTable/TableHeaderCol';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import StatusCell from './cells/StatusCell';
import ViewOrderCell from './cells/ViewOrderCell';
import OrderDateTime from './cells/OrderDateTime';

interface Props {
    orders: [];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    changeSortHandler: (key: string) => void;
    onDelete: (orderId: string) => void;
}

const columns: IColumn[] = [
    { label: 'Order', key: 'orderId', sortable: false },
    { label: 'Customer', key: 'customer', sortable: false },
    { label: 'Date', key: 'date', sortable: true },
    { label: 'Items', key: 'items', sortable: false },
    { label: 'Price', key: 'price', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const OrdersTable: React.FC<Props> = ({ changeSortHandler, onDelete, orders, sortBy, sortOrder }) => {
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
                    {orders.map((order: any, index) => (
                        <TableRow key={order._id}>
                            <TableCell>
                                <span className="text-gray-900">{order.orderId}</span>
                            </TableCell>

                            <TableCell>
                                <div>
                                    <p className="capitalize text-black">
                                        {order.customer.firstName} {order.customer.lastName}
                                    </p>
                                    <span className="font-light tracking-wide text-gray-500">{order.customer.email}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                <OrderDateTime date={order.createdAt} time={order.orderTime} />
                            </TableCell>

                            <TableCell className="text-center lg:text-start">
                                <span>{order.totalQuantity}</span>
                            </TableCell>

                            <TableCell className="font-medium text-gray-700">₹ {order.total}</TableCell>

                            <TableCell>
                                <StatusCell status={order.status} />
                            </TableCell>

                            <TableCell>
                                <ViewOrderCell orderId={order._id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersTable;
