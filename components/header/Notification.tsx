import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from '@nextui-org/react';
import { BiSolidBell } from 'react-icons/bi';

import React from 'react';

const Notification = () => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly radius="full" variant="light" size="md">
                    <BiSolidBell className="text-2xl" />
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                    key="profile"
                    className="h-14 gap-2 hover:bg-none"
                    disableAnimation
                >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>

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

export default Notification;
