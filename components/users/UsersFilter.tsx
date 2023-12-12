import TableSearch from '@/components/ui/table/TableSearch';
import RolesFilter from '@/components/users/RolesFilter';
import StatusFilter from '@/components/users/StatusFilter';
import { Selection } from '@nextui-org/react';
import React from 'react';

interface Props {
    searchState: string;
    selectedStatus: Selection;
    selectedRoles: Selection;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
    setSelectedRoles: React.Dispatch<React.SetStateAction<Selection>>;
}

const UsersFilter: React.FC<Props> = ({ onChange, searchState, selectedRoles, selectedStatus, setSelectedRoles, setSelectedStatus }) => {
    return (
        <div className="grid w-full gap-x-4 gap-y-2 lg:grid-cols-12">
            <div className="w-full flex-grow md:w-auto lg:col-span-8">
                <TableSearch searchState={searchState} onChange={onChange} />
            </div>

            <div className="grid w-full grid-cols-2 items-center justify-between gap-2 lg:col-span-4">
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                <RolesFilter selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
            </div>
        </div>
    );
};

export default UsersFilter;
