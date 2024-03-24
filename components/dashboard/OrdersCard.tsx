import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

interface Props {
    Icon: React.ReactNode | any;
    color?: string;
    heading: string;
    value: number;
}

const OrdersCard: React.FC<Props> = ({ Icon, color, heading, value }) => {
    return (
        <Card shadow="sm">
            <CardBody>
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-full"
                        style={{
                            backgroundColor: color + '20',
                        }}
                    >
                        <Icon className="text-3xl" style={{ color: color }} />
                    </div>

                    <div className="flex flex-col leading-none">
                        <h2 className="font text-base leading-none text-gray-800 ">{heading}</h2>
                        <span className="text-2xl font-bold text-gray-600">{value}</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrdersCard;
