import React from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

export interface IColumn {
    label: string;
    key: string;
    sortable?: boolean;
}

type Props = {
    column: IColumn;
    changeSortHandler: (key: string) => void;
    sortBy: string;
    sortOrder: string;
};

const TableHeaderCol = ({ column, sortBy, changeSortHandler, sortOrder }: Props) => {
    return (
        <div className="flex cursor-pointer items-center gap-2" onClick={() => column.sortable && changeSortHandler(column.key)}>
            <span className={`${sortBy === column.key ? 'text-default-900' : 'text-default-500'}`}>{column.label}</span>

            {column.sortable && (
                <>
                    {sortBy !== column.key && <FaSort className="text-sm text-default-400" />}
                    {sortBy === column.key && sortOrder === 'asc' && <FaSortUp className="text-sm text-default-700" />}
                    {sortBy === column.key && sortOrder === 'desc' && <FaSortDown className="text-sm text-default-700" />}
                </>
            )}
        </div>
    );
};

export default TableHeaderCol;
