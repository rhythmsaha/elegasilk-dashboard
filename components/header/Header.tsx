import React from 'react';
import SearchButton from './SearchButton';
import UserMenu from './UserMenu';

const Header = () => {
    return (
        <header className="sticky top-0 z-40  bg-white bg-opacity-50 px-5 py-3 backdrop-blur lg:px-10 lg:py-6">
            <div className="flex items-center justify-between gap-8">
                <SearchButton />

                <div className="flex items-center justify-between gap-4">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
