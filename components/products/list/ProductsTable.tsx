import CollectionNameCell from '@/components/collections/collectionstable/body/CollectionNameCell';
import TableHeaderCol, { IColumn } from '@/components/users/usersTable/TableHeaderCol';
import StatusCell from '@/components/users/usersTable/tableBody/StatusCell';
import { IProductTableData } from '@/sections/products/ProductsSection';
import formatTimestamp from '@/utils/formatTimestamp';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { FC } from 'react';
import ProductNameCell from './body/ProductNameCell';
import StocksCell from './body/StocksCell';
import priceFormatter from '@/utils/FormatPrice';
import PublishCell from './body/PublishCell';
import ActionCell from './body/ActionCell';

interface Props {
    productsData: IProductTableData[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    changeSortHandler: (key: string) => void;
    onDelete: (productId: string) => void;
}

const columns: IColumn[] = [
    { label: 'Product', key: 'name', sortable: true },
    { label: 'Updated At', key: 'updatedAt', sortable: true },
    { label: 'Stock', key: 'stock', sortable: true },
    { label: 'Price', key: 'MRP', sortable: true },
    { label: 'Publish', key: 'published', sortable: true },
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
                    {productsData.map((product, index) => (
                        <TableRow className={`text-gray-600`} key={product._id}>
                            <TableCell className="capitalize">
                                <ProductNameCell name={product.name} image={product.images.length > 0 ? product.images[0] : ''} discount={product.discount} />
                            </TableCell>

                            <TableCell>
                                <p className="">{formatTimestamp(product.updatedAt)}</p>
                            </TableCell>

                            <TableCell>
                                <StocksCell stock={product.stock} />
                            </TableCell>

                            <TableCell className="">{priceFormatter(product.MRP)}</TableCell>
                            <TableCell>
                                <PublishCell published={product.published} />
                            </TableCell>

                            <TableCell>
                                <ActionCell productId={product._id} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductsTable;
