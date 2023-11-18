import { useSidebarStore } from '@/store/useSidebar';
import { FC } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SidebarHeader from './SidebarHeader';

interface Props {}
const Sidebar: FC<Props> = ({}) => {
    const { isExpanded, toggleSidebar } = useSidebarStore((state) => state);

    return (
        <SimpleBar
            style={{
                maxHeight: '100%',
                scrollBehavior: 'smooth',
            }}
            className=" w-[280px]  select-none border-r border-gray-100"
        >
            <SidebarHeader />
        </SimpleBar>
    );
};

export default Sidebar;
