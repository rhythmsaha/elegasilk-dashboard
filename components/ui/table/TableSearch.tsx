import { Input } from '@nextui-org/react';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
    searchState: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableSearch = () => {
    return (
        <Input
            type="search"
            variant="bordered"
            placeholder="Search"
            startContent={<IoSearchOutline className="text-default-500" />}
        />
    );
};

export default TableSearch;
