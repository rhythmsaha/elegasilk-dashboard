import { IOrderStatusTypesAll } from '@/components/orders/details/Header';

export const getOrderStatusText = (orderStatus: IOrderStatusTypesAll) => {
    let orderStatusText, color: 'warning' | 'danger' | 'success' | 'default' | 'primary' | 'secondary' | undefined;

    switch (orderStatus) {
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
            orderStatusText = 'Delivered';
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

    return {
        orderStatusText,
        color,
    };
};

export const STATUSES: {
    value: IOrderStatusTypesAll;
    label: string;
}[] = [
    { value: 'PLACED', label: 'Pending' },
    { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'EXCHANGED', label: 'Exchanged' },
    { value: 'RETURNED', label: 'Returned' },
    { value: 'REFUNDED', label: 'Refunded' },
];
