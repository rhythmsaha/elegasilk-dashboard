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
        <div className="flex w-full flex-col items-center justify-between gap-x-6 gap-y-2 md:flex-row">
            <div className="w-full flex-grow md:w-auto">
                <TableSearch searchState={searchState} onChange={onChange} />
            </div>

            <div className="flex w-full items-center justify-between gap-2 md:w-max">
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                <RolesFilter selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
            </div>
        </div>
    );
};

export default UsersFilter;
