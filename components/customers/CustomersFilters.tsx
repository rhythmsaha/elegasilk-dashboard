import React from 'react';
import TableSearch from '../ui/table/TableSearch';
import StatusFIlter from './StatusFIlter';
import { Selection } from '@nextui-org/react';

interface Props {
    searchState: string;
    selectedStatus: Selection;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
}

const CustomersFilters: React.FC<Props> = ({ onChange, searchState, selectedStatus, setSelectedStatus }) => {
    return (
        <div className="grid w-full gap-x-4 gap-y-2 lg:grid-cols-4">
            <div className="w-full flex-grow md:w-auto lg:col-span-3">
                <TableSearch searchState={searchState} onChange={onChange} />
            </div>

            <div className="w-full lg:col-span-1">
                <StatusFIlter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            </div>
        </div>
    );
};

export default CustomersFilters;
