import { IProductFormData } from '@/sections/products/NewProductSection';
import { Button, Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
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

    // useEffect(() => {
    //     const defaultLength = 2; // Set your desired default length here

    //     for (let i = 0; i < defaultLength; i++) {
    //         append({ category: '', subcategory: '' }); // Append empty objects to match the default length
    //     }
    // }, [append]);

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

                    <Button
                        type="button"
                        variant="flat"
                        color="primary"
                        className="ml-auto block"
                        onClick={() => {
                            append({ category: '', subcategory: '' });
                        }}
                    >
                        Add More Attributes
                    </Button>

                    <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
                        <Select
                            aria-label="Select Status"
                            placeholder="Status"
                            selectionMode="multiple"
                            className="flex-grow"
                            variant="bordered"
                            classNames={inputClassNames}
                            // selectedKeys={selectedStatus}
                            // onChange={handleStatusSelection}
                            label="Sub Category"
                        >
                            <SelectItem key={'_id'} value={'_id'}>
                                {'name'}
                            </SelectItem>
                        </Select>
                        <Select
                            aria-label="Select Status"
                            placeholder="Status"
                            selectionMode="multiple"
                            className="flex-grow"
                            variant="bordered"
                            classNames={inputClassNames}
                            // selectedKeys={selectedStatus}
                            // onChange={handleStatusSelection}
                            label="Sub Category"
                        >
                            <SelectItem key={'_id'} value={'_id'}>
                                {'name'}
                            </SelectItem>
                        </Select>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PropertiesForm;
