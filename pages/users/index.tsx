import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@nextui-org/react';
import PageName from '@/components/ui/PageName';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import UsersSection from '@/sections/users/UsersSection';

const CreateNewUserButton = () => {
    return (
        <Button as={Link} href="/users/create-new" variant="shadow" color="primary">
            <span>
                <BiPlus />
            </span>

            <span>New User</span>
        </Button>
    );
};

const UsersPage: NextPageWithLayout = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                Button={CreateNewUserButton}
                title="Users List"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Users', href: '/users' },
                ]}
            />

            <UsersSection />
        </div>
    );
};

UsersPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout roles={['superadmin', 'admin']}>{page}</DashboardLayout>;
};

export default UsersPage;
