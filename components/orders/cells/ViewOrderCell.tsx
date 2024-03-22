import React from 'react';
import { FaRegEye } from 'react-icons/fa';

interface Props {
    orderId: string;
}

const ViewOrderCell: React.FC<Props> = (props) => {
    return (
        <button className="gap-2text-center flex flex-col items-center">
            <FaRegEye className="text-xl" />
            <span className="hidden text-center text-xs lg:inline">View</span>
        </button>
    );
};

export default ViewOrderCell;
