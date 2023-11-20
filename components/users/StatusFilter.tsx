import { Select, SelectItem, Selection } from '@nextui-org/react';
import React from 'react';

const statusOptions = [
    { name: 'Active', val: true },
    { name: 'Inactive', val: false },
];

interface Props {
    selectedStatus: Selection;
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
}

const StatusFilter: React.FC<Props> = ({
    selectedStatus,
    setSelectedStatus,
}) => {
    // Handle status selection change
    const handleStatusSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '') return setSelectedStatus(new Set());
        setSelectedStatus(new Set(e.target.value.split(',')));
    };

    return (
        <Select
            aria-label="Select Status"
            placeholder="Status"
            selectionMode="multiple"
            className="w-48 flex-grow"
            selectedKeys={selectedStatus}
            onChange={handleStatusSelection}
            label="Status"
        >
            {statusOptions.map(({ name }) => (
                <SelectItem key={name.toLowerCase()} value={name.toLowerCase()}>
                    {name}
                </SelectItem>
            ))}
        </Select>
    );
};

export default StatusFilter;
