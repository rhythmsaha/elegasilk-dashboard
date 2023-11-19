import { sidebarConfig } from '@/lib/sidebarLinks';
import React from 'react';
import NavSectionHeading from './NavSectionHeading';
import SidebarItem from './SidebarItem';

const SidebarLinks = () => {
    return (
        <section className="space-y-6 px-4">
            {sidebarConfig.map(({ id, menus, type }) => (
                <nav key={id} className="space-y-2">
                    <NavSectionHeading title={type} />

                    <div className="flex flex-col space-y-1">
                        {menus.map((link) => {
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
                        })}
                    </div>
                </nav>
            ))}
        </section>
    );
};

export default SidebarLinks;
