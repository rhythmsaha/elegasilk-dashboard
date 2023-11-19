import { Image } from '@nextui-org/react';
import React from 'react';

const Header = () => {
    return (
        <div className="flex items-center justify-center px-6 py-8">
            <Image src="/logo/icon.png" className="" width={30} alt="Logo" />
        </div>
    );
};

export default Header;
