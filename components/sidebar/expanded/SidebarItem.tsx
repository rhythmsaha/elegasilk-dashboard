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
            fullWidth
            className={`flex items-center justify-start gap-2 text-sm font-medium   ${
                router.pathname !== path && 'text-default-500'
            }`}
        >
            <span>{<Icon className="text-medium" />}</span>
            {title}
        </Button>
    );
};

export default SidebarItem;
