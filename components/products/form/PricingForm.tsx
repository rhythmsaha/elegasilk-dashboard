import { IProductFormData } from '@/sections/products/NewProductSection';
import React from 'react';
import { Control } from 'react-hook-form';

interface Props {
    control: Control<IProductFormData>;
}

const PricingForm = (props: Props) => {
    return (
        <div>
            PricingForm
            {/* MRP */}
            {/* Price */}
        </div>
    );
};

export default PricingForm;
