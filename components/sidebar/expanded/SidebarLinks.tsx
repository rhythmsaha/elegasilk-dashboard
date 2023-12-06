import { sidebarConfig } from '@/lib/sidebarLinks';
import React from 'react';
import NavSectionHeading from './NavSectionHeading';
import SidebarItem from './SidebarItem';
import { useAuthStore } from '@/store/useAuthStore';

const SidebarLinks = () => {
    const userRole = useAuthStore((state) => state.user?.role);

    return (
        <section className="space-y-6 px-4">
            {sidebarConfig.map(({ id, menus, type }) => {
                return (
                    <nav key={id} className="space-y-2">
                        <NavSectionHeading title={type} />

                        <div className="flex flex-col space-y-1">
                            {menus.map((link) => {
                                if (link.roles && !link.roles.includes(userRole!)) return null;
                                return <SidebarItem key={link.id} Icon={link.icon} id={link.id} path={link.path} title={link.title} />;
                            })}
                        </div>
                    </nav>
                );
            })}
        </section>
    );
};

export default SidebarLinks;
