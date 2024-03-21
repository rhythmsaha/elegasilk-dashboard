import { useState } from 'react';
import { useDebounce } from 'react-use';

const useDebouncedSearch = () => {
    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>();
    const [, cancel] = useDebounce(() => setDebouncedSearchQuery(searchQuery), 500, [searchQuery]);

    const onSeachChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

    return { debouncedSearchQuery, onSeachChangeHandler, cancel, searchQuery };
};

export default useDebouncedSearch;
