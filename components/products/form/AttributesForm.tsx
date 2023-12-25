import { ICategory } from '@/components/categories/CategoryCard';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import categories from '@/pages/categories';
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@nextui-org/react';
import React, { FC, useState } from 'react';

interface Props {
    categories: ICategory[];
}

const AttributesForm: FC<Props> = ({ categories }) => {
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

    const selectHandler = (e: any) => {
        const _selectedCategory = categories.find((category) => category._id === e);
        _selectedCategory!.subcategories!.length > 0 && setSubCategories(_selectedCategory!.subcategories!);
    };

    return (
        <div className="grid flex-1 gap-x-2 gap-y-4 lg:grid-cols-2">
            <Autocomplete variant="bordered" defaultItems={categories} label="Category" name="cat1" placeholder="Search a Category" onSelectionChange={selectHandler}>
                {(category) => <AutocompleteItem key={category._id}>{category.name}</AutocompleteItem>}
            </Autocomplete>

            <Select
                aria-label="Select Status"
                placeholder="Status"
                selectionMode="multiple"
                className="flex-grow"
                variant="bordered"
                classNames={inputClassNames}
                isDisabled={subCategories.length === 0}
                // selectedKeys={selectedStatus}
                // onChange={handleStatusSelection}
                label="Sub Category"
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
