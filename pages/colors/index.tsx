import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ColorsSection from '@/sections/colors/ColorsSection';
import PageName from '@/components/ui/PageName';
import CreateNewButton from '@/components/ui/buttons/CreateNewButton';
import { BiPlus } from 'react-icons/bi';
import { useDisclosure } from '@nextui-org/react';
import CreateColorModal from '@/components/colors/CreateColorModal';

const ColorsPage: NextPageWithLayout = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="dashboard-xl">
                <PageName
                    title="Colors"
                    breadcrumb={[
                        { title: 'Dashboard', href: '/' },
                        { title: 'Colors', href: '/colors' },
                    ]}
                    Button={CreateNewButton.bind(null, {
                        text: 'Create New',
                        Icon: <BiPlus />,
                        onClick: onOpen,
                    })}
                />

                <ColorsSection />
            </div>

            <CreateColorModal isOpen={isOpen} onOpenChange={onOpenChange} id="" onCreate={() => {}} />
        </>
    );
};

ColorsPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default ColorsPage;
