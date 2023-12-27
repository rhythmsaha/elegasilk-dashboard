import React, { FC } from 'react';
import TableHeaderCol, { IColumn } from '@/components/users/usersTable/TableHeaderCol';
import { ICollectionTableData } from '@/sections/collections/CollectionsSection';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import StatusCell from '@/components/users/usersTable/tableBody/StatusCell';
import formatTimestamp from '@/utils/formatTimestamp';
import CollectionNameCell from './body/CollectionNameCell';
import ActionsCell from './body/ActionCell';

interface Props {
    collectionsData: ICollectionTableData[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    changeSortHandler: (key: string) => void;
    onDelete: (collectionId: string) => void;
}

const columns: IColumn[] = [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Slug', key: 'slug', sortable: false },
    { label: 'Sub Category', key: 'subcategory', sortable: false },
    { label: 'Status', key: 'status', sortable: true },
    { label: 'Created', key: 'createdAt', sortable: true },
    { label: 'Updated', key: 'updatedAt', sortable: true },
    { label: '', key: 'actions', sortable: false },
];

const CollectionsTable: FC<Props> = ({ changeSortHandler, collectionsData, sortBy, sortOrder, onDelete }) => {
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
                    {collectionsData.map((collection) => (
                        <TableRow key={collection._id} className={`text-gray-600`}>
                            <TableCell>
                                <CollectionNameCell name={collection.name} image={collection.image} />
                            </TableCell>

                            <TableCell>{collection.slug}</TableCell>

                            <TableCell>{collection?.subcategory?.name}</TableCell>

                            <TableCell>
                                <StatusCell status={collection.status} />
                            </TableCell>

                            <TableCell>{formatTimestamp(collection.createdAt)}</TableCell>
                            <TableCell>{formatTimestamp(collection.updatedAt)}</TableCell>

                            <TableCell>
                                <ActionsCell collectionSlug={collection._id} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CollectionsTable;
