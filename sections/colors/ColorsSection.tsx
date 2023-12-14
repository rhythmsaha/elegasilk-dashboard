import ColorCard from '@/components/colors/ColorCard';
import { faker } from '@faker-js/faker';
import React from 'react';

const createFakeColors = () => {
    return Array.from({ length: 50 }).map(() => ({
        hex: faker.internet.color(),
        name: faker.internet.color(),
    }));
};

type Props = {};

const ColorsSection = (props: Props) => {
    const _Colors = createFakeColors();
    return (
        <div className="mt-8 ">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {_Colors.map((_, i) => (
                    <span key={i}>
                        <ColorCard hex={_.hex} name={_.name} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ColorsSection;
