import React from 'react';

type Props = {
    title: string;
    description: string;
};

const ProductFormSectionHeader = ({ title, description }: Props) => {
    return (
        <div className="">
            <div>
                <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    );
};

export default ProductFormSectionHeader;
