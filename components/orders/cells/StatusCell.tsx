import { Chip } from '@nextui-org/react';
import React from 'react';

type OrderStatusType = 'PENDING' | 'PLACED' | 'FAILED' | 'CANCELLED' | 'SHIPPED' | 'DELIVERED' | 'RETURN_REQUESTED' | 'RETURNED' | 'REFUNDED' | 'EXCHANGE_REQUESTED' | 'EXCHANGED';

interface Props {
    status: OrderStatusType;
}

const StatusCell: React.FC<Props> = ({ status }) => {
    let orderStatusText,
        color = 'default' as 'default' | 'warning' | 'danger' | 'success' | 'primary' | 'secondary' | undefined;

    switch (status) {
        case 'PENDING':
            orderStatusText = 'Processing';
            color = 'warning';
            break;
        case 'PLACED':
            orderStatusText = 'Pending';
            color = 'warning';
            break;
        case 'FAILED':
            orderStatusText = 'Failed';

            color = 'danger';
            break;
        case 'CANCELLED':
            orderStatusText = 'Cancelled';
            color = 'danger';
            break;
        case 'SHIPPED':
            orderStatusText = 'Shipped';
            color = 'success';
            break;
        case 'DELIVERED':
            orderStatusText = 'DELIVERED';
            color = 'success';
            break;
        case 'RETURN_REQUESTED':
            orderStatusText = 'Return Requested';
            color = 'warning';
            break;
        case 'RETURNED':
            orderStatusText = 'Returned';
            color = 'success';
            break;
        case 'REFUNDED':
            orderStatusText = 'Refunded';
            color = 'success';
            break;
        case 'EXCHANGE_REQUESTED':
            orderStatusText = 'Exchange Requested';
            color = 'warning';
            break;
        case 'EXCHANGED':
            orderStatusText = 'Exchanged';
            color = 'success';
            break;
        default:
            orderStatusText = 'Unknown';
            color = 'default';
            break;
    }

    return (
        <div>
            <Chip
                color={color}
                size="sm"
                classNames={{
                    content: 'font-bold',
                }}
                variant="flat"
                radius="sm"
            >
                {orderStatusText}
            </Chip>
        </div>
    );
};

export default StatusCell;
