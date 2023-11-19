import React from 'react';
import Header from './Header';
import SidebarLinks from './SidebarLinks';

const CollapsedSidebar = () => {
    return (
        <div className="w-[88px]">
            <Header />
            <SidebarLinks />
        </div>
    );
};

export default CollapsedSidebar;
