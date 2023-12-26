import { IProductFormData } from '@/sections/products/NewProductSection';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import DetailsForm from './form/DetailsForm';
import { ImageFileType } from '@/Typings';
import PropertiesForm from './form/PropertiesForm';
import PricingForm from './form/PricingForm';
import FormBottom from './form/FormBottom';
import { ICategory } from '../categories/CategoryCard';

interface Props {
    control: Control<IProductFormData>;
    images: ImageFileType[];
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>;
    categories: ICategory[];
}

const ProductForm: FC<Props> = ({ control, images, setImages, categories }) => {
    return (
        <div className="space-y-6">
            <DetailsForm control={control} images={images} setImages={setImages} />
            <PropertiesForm control={control} categories={categories} />
            <PricingForm control={control} />
            <FormBottom control={control} />
        </div>
    );
};

export default ProductForm;
