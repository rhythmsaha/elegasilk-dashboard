import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
    id: string;
    title: string;
    path: string;
    Icon: React.ElementType;
}

const SidebarItem: React.FC<Props> = ({ title, Icon, path, id }) => {
    const router = useRouter();

    return (
        <Button
            key={id}
            as={path ? Link : 'button'}
            href={path}
            variant={router.pathname === path ? 'solid' : 'light'}
            color={router.pathname === path ? 'primary' : 'default'}
            radius="md"
            className={`flex h-16 w-full min-w-0 max-w-full flex-col items-center justify-center gap-0.5  ${router.pathname !== path && 'text-default-500'}`}
        >
            <span>
                <Icon className="text-2xl" />
            </span>

            <span className="text-xs font-medium">{title}</span>
        </Button>
    );
};

export default SidebarItem;
