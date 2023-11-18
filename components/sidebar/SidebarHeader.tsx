import { useSidebarStore } from '@/store/useSidebar';
import { Button, Image } from '@nextui-org/react';
import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const SidebarHeader = () => {
    const { isExpanded, toggleSidebar } = useSidebarStore((state) => state);

    return (
        <header className="relative px-8 py-8">
            <Image src="/logo/icon.png" className="" width={30} alt="Logo" />

            <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                className="absolute right-0"
            >
                {isExpanded ? (
                    <HiChevronDoubleLeft className="text-xl " />
                ) : (
                    <HiChevronDoubleRight className="text-xl " />
                )}
            </Button>
        </header>
    );
};

export default SidebarHeader;
