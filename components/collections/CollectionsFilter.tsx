import { Selection } from '@nextui-org/react';
import React from 'react';
import TableSearch from '../ui/table/TableSearch';
import StatusFilter from '../users/StatusFilter';
import SubCategoriesFilter from './SubCategoriesFilter';

interface Props {
    searchState: string;
    selectedStatus: Selection;
    selectedSubCategories: Selection;

    onSeachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
    setSelectedSubCategories: React.Dispatch<React.SetStateAction<Selection>>;
}

const CollectionsFilter: React.FC<Props> = ({ searchState, selectedStatus, selectedSubCategories, onSeachChange, setSelectedStatus, setSelectedSubCategories }) => {
    return (
        <div className="grid w-full gap-x-4 gap-y-2 lg:grid-cols-12">
            <div className="w-full flex-grow md:w-auto lg:col-span-8">
                <TableSearch searchState={searchState} onChange={onSeachChange} />
            </div>

            <div className="grid w-full grid-cols-2 items-center justify-between gap-2 lg:col-span-4">
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                <SubCategoriesFilter selectedSubCategory={selectedSubCategories} setSelectedSubCategory={setSelectedSubCategories} />
            </div>
        </div>
    );
};

export default CollectionsFilter;
