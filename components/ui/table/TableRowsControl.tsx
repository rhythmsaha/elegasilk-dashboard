import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    rowsPerPage: Selection;
    setRowsPerPage: React.Dispatch<React.SetStateAction<any>>;
}
const TableRowsControl: FC<Props> = ({ rowsPerPage, setRowsPerPage }) => {
    return (
        <div className="space-x-2">
            <span>Rows Per Page :</span>
            <Dropdown
                classNames={{
                    trigger: 'w-8',
                    content: 'min-w-0 border px-0 py-0',
                }}
            >
                <DropdownTrigger>
                    <Button variant="light" className="capitalize" isIconOnly>
                        {rowsPerPage}
                    </Button>
                </DropdownTrigger>

                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={rowsPerPage}
                    // @ts-ignore
                    onSelectionChange={setRowsPerPage}
                >
                    <DropdownItem key="5">5</DropdownItem>
                    <DropdownItem key="10">10</DropdownItem>
                    <DropdownItem key="25">25</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default TableRowsControl;
