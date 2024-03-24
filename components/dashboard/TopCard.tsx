import { formatNumber } from '@/utils/FormatPrice';
import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

interface Props {
    Icon: React.ReactNode | any;
    heading: string;
    value: number;
    cash?: number;
    card?: number;
    color?: string;
}

const TopCard: React.FC<Props> = ({ Icon, heading, value, card, cash, color }) => {
    return (
        <Card shadow="sm" className="">
            <CardBody className="p-6">
                <div className="flex flex-col items-center gap-1">
                    <Icon
                        className="text-4xl"
                        style={{
                            color: color,
                        }}
                    />
                    <h4 className="text-base font-semibold text-gray-600">{heading}</h4>
                </div>

                <div className="py-4 text-center">
                    <span className="text-center text-4xl font-bold tracking-wide text-gray-700">{formatNumber(value)}</span>
                </div>
            </CardBody>
        </Card>
    );
};

export default TopCard;
