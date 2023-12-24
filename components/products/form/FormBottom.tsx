import { IProductFormData } from '@/sections/products/NewProductSection';
import React from 'react';
import { Control } from 'react-hook-form';

interface Props {
    control: Control<IProductFormData>;
}

const FormBottom = (props: Props) => {
    return (
        <div>
            FormBottom
            {/* Published */}
            {/* Button */}
        </div>
    );
};

export default FormBottom;
