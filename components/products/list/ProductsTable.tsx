import { IColumn } from '@/components/users/usersTable/TableHeaderCol';
import { IProductTableData } from '@/sections/products/ProductsSection';
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
    return <div>ProductsTable</div>;
};

export default ProductsTable;
