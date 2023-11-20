import React from 'react';
import SearchButton from './SearchButton';
import UserMenu from './UserMenu';
import Notification from './Notification';

const Header = () => {
    return (
        <header className="sticky top-0 z-10  bg-white bg-opacity-50 px-5 py-2.5 backdrop-blur lg:px-10 lg:py-6">
            <div className="flex items-center justify-between gap-8">
                <SearchButton />

                <div className="flex items-center justify-between gap-4">
                    {/* <Notification /> */}
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
