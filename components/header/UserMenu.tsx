import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection } from '@nextui-org/react';
import { useAuthStore } from '@/store/useAuthStore';
import axios from '@/utils/axios';
import { setSession } from '@/utils/jwt';
import Link from 'next/link';

const UserMenu = () => {
    const { logout, user } = useAuthStore((state) => state);

    const logoutHandler = () => {
        setSession('');
        logout();
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar isBordered as="button" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </DropdownTrigger>

            <DropdownMenu aria-label="Static Actions" disabledKeys={['profileData']}>
                <DropdownSection
                    aria-label="Profile & Actions"
                    showDivider
                    classNames={{
                        divider: 'bg-gray-100',
                    }}
                >
                    <DropdownItem key="profileData" isReadOnly className="h-14 gap-2 opacity-100" textValue="Profile Details">
                        <div>
                            <span className="block font-medium text-gray-700">Rhythm Saha</span>
                            <span className="block text-gray-400">@rhythmsaha</span>
                        </div>
                    </DropdownItem>
                </DropdownSection>

                <DropdownItem as={Link} href="/my-account" key="settings">
                    Profile
                </DropdownItem>

                <DropdownItem key="logout" className="text-danger" color="danger" onClick={logoutHandler}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserMenu;
