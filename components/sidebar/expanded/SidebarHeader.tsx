import { Image } from '@nextui-org/react';
import React from 'react';

const SidebarHeader = () => {
    return (
        <header className="relative px-8 py-8">
            <Image src="/logo/icon.png" className="" width={30} alt="Logo" />
        </header>
    );
};

export default SidebarHeader;
