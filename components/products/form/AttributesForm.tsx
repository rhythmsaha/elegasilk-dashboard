import { ICategory } from '@/components/categories/CategoryCard';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import categories from '@/pages/categories';
import { IProductFormData } from '@/sections/products/NewProductSection';
import { Autocomplete, AutocompleteItem, Input, Select, SelectItem, Selection } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react';
import { Control, Controller, FieldArrayWithId } from 'react-hook-form';

interface Props {
    categories: ICategory[];
    field: FieldArrayWithId<IProductFormData, 'attributes', 'id'>;
    control: Control<IProductFormData>;
    index: number;
}

const AttributesForm: FC<Props> = ({ categories, field, control, index }) => {
    const _selectedCategory = categories.find((category) => category._id === field._id);
    const subCategories = _selectedCategory?.subcategories || [];

    // // console.log(field);

    // useEffect(() => {
    //     if (!field._id) return;
    //     const _selectedCategory = categories.find((category) => category._id === field._id);

    //     _selectedCategory.subcategories.length > 0 && setSubCategories(_selectedCategory!.subcategories!);
    // }, [field._id, categories]);

    return (
        <div className="w-full">
            <Controller
                name={`attributes.${index}.subcategory`}
                control={control}
                render={({ field: _field, formState, fieldState }) => {
                    const values: Selection = new Set(_field?.value?.split(','));

                    return (
                        <Select
                            {..._field}
                            defaultSelectedKeys={values || []}
                            label={field.category}
                            fullWidth
                            scrollShadowProps={{
                                isEnabled: false,
                            }}
                            variant="bordered"
                            classNames={inputClassNames}
                            isDisabled={subCategories.length === 0 || formState.isSubmitting}
                            isInvalid={fieldState.invalid}
                            selectionMode="multiple"
                        >
                            {subCategories.map(({ name, _id }) => (
                                <SelectItem key={_id} value={_id}>
                                    {name}
                                </SelectItem>
                            ))}
                        </Select>
                    );
                }}
            />
        </div>
    );
};

export default AttributesForm;
