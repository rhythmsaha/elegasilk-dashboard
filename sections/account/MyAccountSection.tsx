import { useState } from 'react';
import SettingTabs, { ITabKeys } from '@/components/myaccount/SettingTabs';
import GeneralSection from '@/components/myaccount/generalSection/GeneralSection';
import SecuritySection from '@/components/myaccount/securitySection/SecutirySection';

const ConditionalSection = ({ selectedTab }: { selectedTab: ITabKeys }) => {
    if (selectedTab === 'General') {
        return <GeneralSection />;
    }

    if (selectedTab === 'Security') {
        return <SecuritySection />;
    }

    return null;
};

const MyAccountSection = () => {
    const [selectedTab, setSelectedTab] = useState<ITabKeys>('General');

    const handleTabChange = (tab: ITabKeys) => {
        if (tab === selectedTab) return;
        setSelectedTab(tab);
    };

    return (
        <div>
            <SettingTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />

            <div className="mt-8">
                <ConditionalSection selectedTab={selectedTab} />
            </div>
        </div>
    );
};

export default MyAccountSection;
