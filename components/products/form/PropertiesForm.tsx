import { IProductFormData } from '@/sections/products/NewProductSection';
import { Card, CardBody, Input, Select, SelectItem, Selection } from '@nextui-org/react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import ProductFormSectionHeader from '../ProductFormSectionHeader';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import AttributesForm from './AttributesForm';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import { ICollection } from '@/hooks/collections/useCollection';
import { useColorsStore } from '@/store/colors/useColors';
import { ICategory } from '@/components/categories/CategoryCard';

interface Props {
    control: Control<IProductFormData>;
    categories: ICategory[];
}

const PropertiesForm: FC<Props> = ({ control, categories }) => {
    const [collections, setCollections] = useState<ICollection[]>([]);
    const { colors, fetchColors } = useColorsStore((state) => state);

    const { fields } = useFieldArray({
        control,
        name: 'attributes',
    });

    const fetchCollections = useCallback(async () => {
        const queries = [];
        queries.push(`stopPagination=true`);
        queries.push(`populateSubCategory=true`);
        const response = await axios.get(API_URLS.getCollections + `?${queries.join('&')}`);
        setCollections(response.data.data);
    }, []);

    useEffect(() => {
        fetchCollections();
        fetchColors();
    }, [fetchCollections, fetchColors]);

    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="space-y-4 lg:space-y-6">
                    <ProductFormSectionHeader title="Properties" description="Additional functions and attributes..." />

                    <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
                        <Controller
                            name="sku"
                            rules={{
                                // required: 'SKU is required!',
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
                                // required: 'stock is required!',
                                minLength: {
                                    value: 0,
                                    message: 'Stock must be Positive Number',
                                },
                            }}
                            control={control}
                            render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                <Input
                                    name={name}
                                    onValueChange={onChange}
                                    defaultValue={value?.toString()}
                                    type="number"
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

                        {fields.map((field, index) => (
                            <AttributesForm key={index} index={index} categories={categories} field={field} control={control} />
                        ))}

                        <Controller
                            name="collections"
                            control={control}
                            render={({ field: _field, formState, fieldState }) => {
                                const values: Selection = new Set(_field?.value?.split(','));

                                return (
                                    <Select
                                        {..._field}
                                        selectedKeys={values}
                                        label="Collections"
                                        aria-label="Collections"
                                        selectionMode="multiple"
                                        variant="bordered"
                                        classNames={inputClassNames}
                                        fullWidth
                                    >
                                        {collections.map((collection) => (
                                            <SelectItem key={collection._id} value={collection._id}>
                                                {collection.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                );
                            }}
                        />

                        <Controller
                            name="collections"
                            control={control}
                            render={({ field: _field, formState, fieldState }) => {
                                const values: Selection = new Set(_field?.value?.split(','));

                                return (
                                    <Select
                                        {..._field}
                                        selectedKeys={values}
                                        aria-label="Select Colors"
                                        label="Select Colors"
                                        selectionMode="multiple"
                                        className="flex-grow"
                                        variant="bordered"
                                        classNames={inputClassNames}
                                        fullWidth
                                    >
                                        {colors.map((color) => (
                                            <SelectItem key={color._id} value={color._id}>
                                                {color.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                );
                            }}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PropertiesForm;
