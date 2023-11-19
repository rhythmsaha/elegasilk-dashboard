import { sidebarConfig } from '@/lib/sidebarLinks';
import React from 'react';
import SidebarItem from './SidebarItem';

const SidebarLinks = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 px-1.5 ">
            {sidebarConfig.map(({ id, menus, type }) => {
                return menus.map((link) => {
                    // if (link.mobileOnly && width >= 768) return;
                    return (
                        <SidebarItem
                            key={link.id}
                            Icon={link.icon}
                            id={link.id}
                            path={link.path}
                            title={link.title}
                        />
                    );
                });
            })}
        </div>
    );
};

export default SidebarLinks;
