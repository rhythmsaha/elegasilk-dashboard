import { IProductFormData } from '@/sections/products/NewProductSection';
import { Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import ProductFormSectionHeader from '../ProductFormSectionHeader';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import useCategory from '@/hooks/category/useCategory';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import { ICategory } from '@/components/categories/CategoryCard';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import AttributesForm from './AttributesForm';

interface Props {
    control: Control<IProductFormData>;
}

const PropertiesForm: FC<Props> = ({ control }) => {
    const [selectedCategory, setselectedCategory] = useState<ISubCategory[]>([]);

    const { getCategories, categories } = useFetchCategory();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    });

    useEffect(() => {
        getCategories(true);
    }, [getCategories]);

    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="space-y-4 lg:space-y-6">
                    <ProductFormSectionHeader title="Properties" description="Additional functions and attributes..." />

                    <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
                        <Controller
                            name="sku"
                            rules={{
                                required: 'SKU is required!',
                                minLength: {
                                    value: 5,
                                    message: 'SKU must be at least 5 characters',
                                },
                            }}
                            control={control}
                            render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                <Input
                                    name={name}
                                    onValueChange={onChange}
                                    defaultValue={value}
                                    onBlur={onBlur}
                                    type="text"
                                    label="Product SKU"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    disabled={formState.isSubmitting}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="stock"
                            rules={{
                                required: 'stock is required!',
                                minLength: {
                                    value: 5,
                                    message: 'SKU must be at least 5 characters',
                                },
                            }}
                            control={control}
                            render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                <Input
                                    name={name}
                                    onValueChange={onChange}
                                    defaultValue={value?.toString()}
                                    type="tel"
                                    onBlur={onBlur}
                                    label="Product Quantity (Stock)"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    disabled={formState.isSubmitting}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                />
                            )}
                        />
                    </div>

                    {fields.map((field, index) => (
                        <AttributesForm key={index} categories={categories} />
                    ))}

                    <button
                        type="button"
                        onClick={() => {
                            append({ category: '', subcategory: '' });
                        }}
                    >
                        Add
                    </button>

                    {/* Collection */}
                    {/* Colors */}
                </div>
            </CardBody>
        </Card>
    );
};

export default PropertiesForm;
