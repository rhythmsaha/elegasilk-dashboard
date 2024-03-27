import { useMobileMenuStore } from '@/store/mobilemenu/useMenuStore';
import React from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

interface Props {}

const HamburgerMenuButton: React.FC<Props> = (props) => {
    const onOpen = useMobileMenuStore((state) => state.open);

    return (
        <div className="xl:hidden" onClick={onOpen}>
            <HiOutlineMenuAlt1 className="cursor-pointer text-2xl" />
        </div>
    );
};

export default HamburgerMenuButton;
