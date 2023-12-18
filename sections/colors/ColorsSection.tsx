import ColorCard from '@/components/colors/ColorCard';
import { useColorsStore } from '@/store/colors/useColors';
import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';

type Props = {};

const ColorsSection = (props: Props) => {
    const { colors, error, isLoading, addColor, deleteColor, editColor, fetchColors } = useColorsStore((state) => state);

    useEffect(() => {
        fetchColors();
    }, [fetchColors]);

    return (
        <div className="mt-8 ">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {colors.map((_, i) => (
                    <span key={i}>
                        <ColorCard hex={_.hex} name={_.name} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ColorsSection;
