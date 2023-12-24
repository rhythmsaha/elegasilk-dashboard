import { IProductFormData } from '@/sections/products/NewProductSection';
import React from 'react';
import { Control } from 'react-hook-form';

interface Props {
    control: Control<IProductFormData>;
}

const PropertiesForm = (props: Props) => {
    return (
        <div>
            PropertiesForm
            {/* Stock */}
            {/* Category, SubCategory */}
            {/* Collection */}
            {/* Colors */}
        </div>
    );
};

export default PropertiesForm;
