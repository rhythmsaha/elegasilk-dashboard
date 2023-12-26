import { IProductFormData } from '@/sections/products/NewProductSection';
import { Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
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

                    <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
                        {fields.map((field, index) => (
                            <AttributesForm key={index} index={index} categories={categories} field={field} control={control} />
                        ))}
                    </div>

                    <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
                        <Select
                            aria-label="Choose Collections"
                            placeholder="Choose Here"
                            selectionMode="multiple"
                            className="flex-grow"
                            variant="bordered"
                            classNames={inputClassNames}
                            // selectedKeys={selectedStatus}
                            // onChange={handleStatusSelection}
                            label="Collections"
                        >
                            {collections &&
                                collections.map((collection) => (
                                    <SelectItem key={collection._id} value={collection._id}>
                                        {collection.name}
                                    </SelectItem>
                                ))}
                        </Select>

                        <Select
                            aria-label="Select Colors"
                            placeholder="choose here"
                            selectionMode="multiple"
                            className="flex-grow"
                            variant="bordered"
                            classNames={inputClassNames}
                            // selectedKeys={selectedStatus}
                            // onChange={handleStatusSelection}
                            label="Select Colors"
                        >
                            {colors.map((color) => (
                                <SelectItem key={color._id} value={color._id}>
                                    {color.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PropertiesForm;
