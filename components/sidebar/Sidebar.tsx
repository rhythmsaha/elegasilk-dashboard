import { useSidebarStore } from '@/store/useSidebar';
import { FC } from 'react';
import ExpandedSidebar from './expanded/ExpandedSidebar';
import CollapsedSidebar from './collapsed/CollapsedSidebar';
import { HiChevronRight } from 'react-icons/hi';
import { Button } from '@nextui-org/react';

interface Props {}
const Sidebar: FC<Props> = ({}) => {
    const { isExpanded, toggleSidebar } = useSidebarStore((state) => state);

    return (
        <div className="relative h-screen  select-none border-r border-gray-100 ">
            <Button
                isIconOnly
                radius="full"
                className="absolute right-0 top-8 z-10  translate-x-1/2 border-1 border-gray-100 bg-white shadow"
                size="sm"
                variant="faded"
                onClick={toggleSidebar}
            >
                <HiChevronRight className="text-lg text-gray-500" />
            </Button>

            {isExpanded ? <ExpandedSidebar /> : <CollapsedSidebar />}
        </div>
    );
};

export default Sidebar;
