import { Select, SelectItem, Selection } from '@nextui-org/react';
import React, { FC } from 'react';

const rolesOptions = [
    { name: 'Super Admin', val: 'superadmin' },
    { name: 'Admin', val: 'admin' },
    { name: 'Moderator', val: 'moderator' },
    { name: 'Guest', val: 'guest' },
];

interface Props {
    selectedRoles: Selection;
    setSelectedRoles: React.Dispatch<React.SetStateAction<Selection>>;
}

const RolesFilter: FC<Props> = ({ selectedRoles, setSelectedRoles }) => {
    // Handle roles selection change
    const handleRolesSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '') return setSelectedRoles(new Set());
        setSelectedRoles(new Set(e.target.value.split(',')));
    };

    return (
        <Select aria-label="Select Roles" placeholder="Select Roles" label="Roles" selectionMode="multiple" className="flex-grow" selectedKeys={selectedRoles} onChange={handleRolesSelection}>
            {rolesOptions.map(({ name, val }, index) => (
                <SelectItem key={val.toLowerCase()} value={val.toLowerCase()}>
                    {name}
                </SelectItem>
            ))}
        </Select>
    );
};

export default RolesFilter;
