import { Button } from '@nextui-org/react';
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const SearchButton = () => {
    return (
        <Button
            isIconOnly
            radius="full"
            variant="light"
            size="md"
            className="text-default-600"
        >
            <HiMagnifyingGlass className="text-xl" />
        </Button>
    );
};

export default SearchButton;
