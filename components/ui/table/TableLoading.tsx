import { Skeleton } from '@nextui-org/react';
import React from 'react';

type Props = {
    rows?: number;
    isLoading?: boolean;
};

const TableLoading = ({ isLoading, rows = 5 }: Props) => {
    return (
        <div className="mt-4 space-y-2">
            {[...Array(rows)].map((_, index) => (
                <Skeleton key={index} className="rounded-lg">
                    <div className="h-12 rounded-lg bg-default-50"></div>
                </Skeleton>
            ))}
        </div>
    );
};

export default TableLoading;
