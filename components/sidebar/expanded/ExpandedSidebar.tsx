import React from 'react';
import SimpleBar from 'simplebar-react';
import SidebarHeader from './SidebarHeader';
import 'simplebar-react/dist/simplebar.min.css';
import SidebarLinks from './SidebarLinks';

type Props = {};

const ExpandedSidebar = (props: Props) => {
    return (
        <SimpleBar
            style={{ maxHeight: '100%', scrollBehavior: 'smooth' }}
            className="w-[280px]"
        >
            <SidebarHeader />
            <SidebarLinks />
        </SimpleBar>
    );
};

export default ExpandedSidebar;
