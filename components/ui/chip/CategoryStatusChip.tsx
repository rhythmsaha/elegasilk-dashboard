import { Chip } from '@nextui-org/react';
import React from 'react';

interface Props {
    status: boolean;
}

const CategoryStatusChip = ({ status }: Props) => {
    return (
        <>
            {status ? (
                <Chip color="success" variant="solid" className="absolute right-3 top-3 !text-white" style={{ zIndex: 10 }}>
                    Active
                </Chip>
            ) : (
                <Chip color="danger" variant="solid" className="absolute right-3 top-3 !text-white" style={{ zIndex: 10 }}>
                    Inactive
                </Chip>
            )}
        </>
    );
};

export default CategoryStatusChip;
