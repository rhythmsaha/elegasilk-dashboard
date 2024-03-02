import { Select, SelectItem, Selection } from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    selectedPublish: Selection;
    setSelectedPublish: React.Dispatch<React.SetStateAction<Selection>>;
}

const publishOptions = [
    { name: 'Published', val: true },
    { name: 'Draft', val: false },
];

const PublishFilter: FC<Props> = ({ selectedPublish, setSelectedPublish }) => {
    const handlePublishSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '') return setSelectedPublish(new Set());
        setSelectedPublish(new Set(e.target.value.split(',')));
    };

    return (
        <Select aria-label="Select Publish" label="Publish" selectionMode="single" className="flex-grow" selectedKeys={selectedPublish} onChange={handlePublishSelection}>
            {publishOptions.map(({ name, val }) => (
                <SelectItem key={name.toLowerCase()} value={name.toLowerCase()}>
                    {name}
                </SelectItem>
            ))}
        </Select>
    );
};

export default PublishFilter;
