import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Color } from 'react-color';

type Props = {
    hex: Color;
    name: string;
};

const ColorCard = ({ hex, name }: Props) => {
    const style: React.CSSProperties = {
        backgroundColor: hex as string,
    };

    return (
        <Card>
            <CardBody className="p-4">
                <div className="flex items-center gap-4">
                    <div style={style} className="aspect-square h-6 w-6 rounded-full border shadow" />
                    <span className="font-medium text-gray-800">{name}</span>
                </div>
            </CardBody>
        </Card>
    );
};

export default ColorCard;
