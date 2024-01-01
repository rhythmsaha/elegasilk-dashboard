import { IProductFormData } from '@/sections/products/NewProductSection';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import DetailsForm from './form/DetailsForm';
import { ImageFileType } from '@/Typings';
import PropertiesForm from './form/PropertiesForm';
import PricingForm from './form/PricingForm';
import FormBottom from './form/FormBottom';
import { ICategory } from '../categories/CategoryCard';
import SpecsForm from './form/SpecsForm';

interface Props {
    control: Control<IProductFormData>;
    images: ImageFileType[];
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>;
    categories: ICategory[];
    onSubmit: () => void;
}

const ProductForm: FC<Props> = ({ control, images, setImages, categories, onSubmit }) => {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <DetailsForm control={control} images={images} setImages={setImages} />
            <PropertiesForm control={control} categories={categories} />
            <SpecsForm control={control} />
            <PricingForm control={control} />
            <FormBottom control={control} />
        </form>
    );
};

export default ProductForm;
