import { ICategory } from '@/components/categories/CategoryCard';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import categories from '@/pages/categories';
import { IProductFormData } from '@/sections/products/NewProductSection';
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react';
import { FieldArrayWithId } from 'react-hook-form';

interface Props {
    categories: ICategory[];
    field: FieldArrayWithId<IProductFormData, 'attributes', 'id'>;
}

const AttributesForm: FC<Props> = ({ categories, field }) => {
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

    useEffect(() => {
        const _selectedCategory = categories.find((category) => category._id === field._id);
        _selectedCategory!.subcategories!.length > 0 && setSubCategories(_selectedCategory!.subcategories!);
    }, [field._id, categories]);

    return (
        <div className="w-full">
            <Select
                aria-label="Select Status"
                selectionMode="multiple"
                className="flex-grow"
                variant="bordered"
                classNames={inputClassNames}
                isDisabled={subCategories.length === 0}
                // selectedKeys={selectedStatus}
                // onChange={handleStatusSelection}
                label={field.category}
            >
                {subCategories.map(({ name, _id }) => (
                    <SelectItem key={_id} value={_id}>
                        {name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default AttributesForm;
