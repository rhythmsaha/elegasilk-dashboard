import SubCategoryCard, { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import React, { FC } from 'react';

interface Props {
    subcategories: ISubCategory[];
    onDelete: (id: string) => void;
}

const SubCategoriesSetion: FC<Props> = ({ subcategories, onDelete }) => {
    return (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((subcategory) => (
                <SubCategoryCard key={subcategory._id} category={subcategory} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default SubCategoriesSetion;
