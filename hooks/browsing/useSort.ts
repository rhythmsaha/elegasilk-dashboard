import { useCallback, useState } from 'react';

const useSort = (sortby?: string, order?: 'asc' | 'desc') => {
    // Sort States
    const [sortBy, setSortBy] = useState(sortby || ''); // State for sorting
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(order || 'desc');

    // Sort Change function
    const changeSortHandler = useCallback(
        (key: string) => {
            if (sortBy === key) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortBy(key);
                setSortOrder('asc');
            }
        },
        [sortBy, sortOrder]
    );

    return { sortBy, sortOrder, changeSortHandler };
};

export default useSort;
