import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import React, { FC } from 'react';
import TabButton from './TabButton';
import { FaBell, FaGear, FaKey } from 'react-icons/fa6';

export type ITabKeys = 'General' | 'Notifications' | 'Security';

interface Props {
    selectedTab: ITabKeys;
    handleTabChange: (tab: ITabKeys) => void;
}

const SettingTabs: FC<Props> = ({ selectedTab, handleTabChange }) => {
    return (
        <ScrollShadow orientation="horizontal" className="mt-10 overflow-x-auto scrollbar-hide">
            <Tabs
                aria-label="Options"
                color="default"
                variant="underlined"
                selectedKey={selectedTab}
                onSelectionChange={(tab) => handleTabChange(tab as ITabKeys)}
                classNames={{
                    tabList: 'px gap-8',
                    cursor: 'w-full max-w-none min-w-0',
                    tab: 'max-w-fit px-0 min-w-0 h-12 sm:h-14 w-full',
                    tabContent: 'min-0 max-w-none w-full',
                }}
            >
                <Tab key="General" title={<TabButton label="General" Icon={FaGear} />} />
                <Tab key="Notifications" title={<TabButton label="Notifications" Icon={FaBell} />} />
                <Tab key="Security" title={<TabButton label="Security" Icon={FaKey} />} />
            </Tabs>
        </ScrollShadow>
    );
};

export default SettingTabs;
