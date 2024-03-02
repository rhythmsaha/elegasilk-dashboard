import { Chip } from '@nextui-org/react';
import React from 'react';

interface Props {
    stock: number;
}

const formatStocks = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'danger' };
    if (stock < 10) return { text: 'Low Stock', color: 'warning' };
    return { text: 'In Stock', color: 'success' };
};

const StocksCell = ({ stock }: Props) => {
    const color = formatStocks(stock).color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;

    return (
        <div>
            <Chip color={color} size="sm" variant="flat" className="px-4 py-2 text-xs font-semibold">
                {formatStocks(stock).text}
            </Chip>
        </div>
    );
};

export default StocksCell;
