import { Pagination, Selection } from '@nextui-org/react';
import React from 'react';
import TableRowsControl from './TableRowsControl';

interface ITablePaginationProps {
    totalPage: number;
    initialPage: number;
    showControls: boolean;
    curentPage: number;
    siblings: number;
    boundaries: number;
    rowsPerPage: Selection;
    changePageHandler: React.Dispatch<React.SetStateAction<number>>;
    changeRowsPerPageHandler: React.Dispatch<React.SetStateAction<any>>;
}

const TablePagination: React.FC<ITablePaginationProps> = ({
    totalPage,
    initialPage,
    showControls,

    curentPage,
    boundaries,
    changePageHandler,
    changeRowsPerPageHandler,

    rowsPerPage,
    siblings,
}) => {
    return (
        <div className="flex flex-col items-center justify-between gap-4 px-4 pt-4 sm:flex-row">
            <Pagination
                total={totalPage}
                initialPage={initialPage}
                showControls={showControls}
                page={curentPage}
                onChange={changePageHandler}
                size="sm"
                radius="full"
                className="order-1 sm:order-none"
                siblings={siblings}
                boundaries={boundaries}
            />

            <TableRowsControl rowsPerPage={rowsPerPage} setRowsPerPage={changeRowsPerPageHandler} />
        </div>
    );
};

export default TablePagination;
