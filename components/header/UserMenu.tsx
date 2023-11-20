import React from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar,
} from '@nextui-org/react';

const UserMenu = () => {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
            </DropdownTrigger>

            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserMenu;
