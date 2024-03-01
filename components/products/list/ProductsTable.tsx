import CollectionNameCell from '@/components/collections/collectionstable/body/CollectionNameCell';
import TableHeaderCol, { IColumn } from '@/components/users/usersTable/TableHeaderCol';
import StatusCell from '@/components/users/usersTable/tableBody/StatusCell';
import { IProductTableData } from '@/sections/products/ProductsSection';
import formatTimestamp from '@/utils/formatTimestamp';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    productsData: IProductTableData[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    changeSortHandler: (key: string) => void;
    onDelete: (productId: string) => void;
}

const columns: IColumn[] = [
    { label: 'Product', key: 'name', sortable: true },
    { label: 'Created at', key: 'createdAt', sortable: true },
    { label: 'Stock', key: 'stock', sortable: true },
    { label: 'Price', key: 'price', sortable: true },
    { label: 'Publish', key: 'publish', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const ProductsTable: FC<Props> = ({ changeSortHandler, onDelete, productsData, sortBy, sortOrder }) => {
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
                    {productsData.map((_, index) => (
                        <TableRow className={`text-gray-600`} key={index}>
                            <TableCell>
                                <CollectionNameCell
                                    name={'Lorem ipsum dolor sit amet.'}
                                    image={'https://res.cloudinary.com/desihzeid/image/upload/v1702053189/elegasilk/avatars/hwdyvueqdevzmkdo5suw.webp'}
                                />
                            </TableCell>

                            <TableCell>{formatTimestamp(Date())}</TableCell>

                            <TableCell>
                                <StatusCell status={true} />
                            </TableCell>

                            <TableCell>1499</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>{':'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductsTable;
