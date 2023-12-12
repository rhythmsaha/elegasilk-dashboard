import React from 'react';
import CategorySelect from './Input/CategorySelect';
import { Selection } from '@nextui-org/react';

interface Props {
    selectedSubCategory: Selection;
    setSelectedSubCategory: React.Dispatch<React.SetStateAction<Selection>>;
}

const SubCategoriesFilter: React.FC<Props> = ({ selectedSubCategory, setSelectedSubCategory }) => {
    const handleStatusSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '') return setSelectedSubCategory(new Set());
        setSelectedSubCategory(new Set(e.target.value.split(',')));
    };

    return (
        <div className="w-full">
            <CategorySelect
                label="Select Category"
                fullWidth
                placeholder="Click here to choose"
                variant="flat"
                className=""
                defaultSelectedKeys={selectedSubCategory}
                onChange={handleStatusSelection}
            />
        </div>
    );
};

export default SubCategoriesFilter;
