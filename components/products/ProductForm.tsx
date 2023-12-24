import { IProductFormData } from '@/sections/products/NewProductSection';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import DetailsForm from './form/DetailsForm';

interface Props {
    control: Control<IProductFormData>;
}

const ProductForm: FC<Props> = ({ control }) => {
    return (
        <div>
            <DetailsForm control={control} />
        </div>
    );
};

export default ProductForm;
