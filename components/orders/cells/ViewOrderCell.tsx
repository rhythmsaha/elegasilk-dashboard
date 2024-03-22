import Link from 'next/link';
import React from 'react';
import { FaRegEye } from 'react-icons/fa';

interface Props {
    orderId: string;
}

const ViewOrderCell: React.FC<Props> = ({ orderId }) => {
    return (
        <Link href={`/orders/${orderId}`} className="gap-2text-center flex flex-col items-center">
            <FaRegEye className="text-xl" />
            <span className="hidden text-center text-xs lg:inline">View</span>
        </Link>
    );
};

export default ViewOrderCell;
