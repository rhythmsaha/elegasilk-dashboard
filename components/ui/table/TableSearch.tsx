import { Input } from '@nextui-org/react';
import React, { FC } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
    searchState: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableSearch: FC<Props> = ({ searchState, onChange }) => {
    return <Input type="search" variant="bordered" placeholder="Search" startContent={<IoSearchOutline className="text-default-500" />} value={searchState} onChange={onChange} />;
};

export default TableSearch;
