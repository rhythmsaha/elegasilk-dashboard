import { Select, SelectItem, Selection } from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    selectedStock: Selection;
    setSelectedStock: React.Dispatch<React.SetStateAction<Selection>>;
}

const stockOptions = [
    { name: 'In Stock', val: 'IN_STOCK' },
    { name: 'Low Stock', val: 'LOW_STOCK' },
    { name: 'Out of Stock', val: 'OUT_OF_STOCK' },
];

const StocksFilter = (props: Props) => {
    const handleStockSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '') return props.setSelectedStock(new Set());
        props.setSelectedStock(new Set(e.target.value.split(',')));
    };

    return (
        <Select aria-label="Select Stock" label="Stock" selectionMode="single" className="flex-grow" selectedKeys={props.selectedStock} onChange={handleStockSelection}>
            {stockOptions.map(({ name }) => (
                <SelectItem key={name.toLowerCase()} value={name.toLowerCase()}>
                    {name}
                </SelectItem>
            ))}
        </Select>
    );
};

export default StocksFilter;
