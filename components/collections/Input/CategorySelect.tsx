import React, { useEffect } from 'react';
import { Select, SelectItem, SelectProps, SelectSection, Spinner, forwardRef } from '@nextui-org/react';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import { UseFormRegister } from 'react-hook-form';
import { IColletionFormData } from '@/sections/collections/NewCollectionSection';

const headingClasses = 'flex w-full z-20 py-3 px-2 bg-primary-50 text-primary-600 shadow-small rounded-small';

interface ICategorySelectData {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    status?: boolean;
    subcategories?: [{ _id: string; name: string; slug: string }];
}

type Props = Omit<SelectProps, 'children'> & {
    register?: UseFormRegister<IColletionFormData>;
    loading?: boolean;
};

const CategorySelect = forwardRef((props: Props, ref) => {
    const { categories, getCategories, isLoading, deleteCategory } = useFetchCategory();

    useEffect(() => {
        getCategories(true);
    }, [getCategories]);

    return (
        <Select {...props}>
            {isLoading ? (
                <SelectItem key="loading" isDisabled>
                    <div className="flex items-center justify-center py-10">
                        <Spinner />
                    </div>
                </SelectItem>
            ) : categories && categories.length > 0 ? (
                categories.map((cateory) => {
                    const { name, _id, subcategories } = { ...cateory } as ICategorySelectData;

                    return (
                        <SelectSection
                            key={_id}
                            title={name}
                            classNames={{
                                heading: headingClasses,
                            }}
                        >
                            {subcategories && subcategories.length > 0 ? subcategories.map((_sub) => <SelectItem key={_sub._id}>{_sub.name}</SelectItem>) : null!}
                        </SelectSection>
                    );
                })
            ) : (
                ((
                    <SelectItem key="loading" isDisabled textValue="NotFound">
                        <div className="flex items-center justify-center">No Categoris Available</div>
                    </SelectItem>
                ) as any)
            )}
        </Select>
    );
});

export default CategorySelect;
