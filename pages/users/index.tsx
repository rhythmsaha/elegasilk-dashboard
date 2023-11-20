import React, { useState } from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button, Card, CardBody, Selection, Pagination } from '@nextui-org/react';
import PageName from '@/components/ui/PageName';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import TableSearch from '@/components/ui/table/TableSearch';
import StatusFilter from '@/components/users/StatusFilter';
import RolesFilter from '@/components/users/RolesFilter';
import UsersTable from '@/components/users/UsersTable';
import TableRowsControl from '@/components/ui/table/TableRowsControl';

const usersData = [
    {
        id: 1,
        first_name: 'Elfreda',
        last_name: 'McCrainor',
        email: 'emccrainor0@xrea.com',
        username: 'emccrainor0',
        phone: '882-490-7148',
        role: 'Architect',
        status: false,
        createdAt: '12/10/2022',
        updatedAt: '3/9/2023',
        avatar: 'https://robohash.org/itaquemaximeeaque.png?size=100x100&set=set1',
    },
    {
        id: 2,
        first_name: 'Katee',
        last_name: 'Farreil',
        email: 'kfarreil1@sfgate.com',
        username: 'kfarreil1',
        phone: '269-193-5341',
        role: 'Construction Manager',
        status: false,
        createdAt: '9/8/2023',
        updatedAt: '9/16/2023',
        avatar: 'https://robohash.org/enimremincidunt.png?size=100x100&set=set1',
    },
    {
        id: 3,
        first_name: 'Rawley',
        last_name: 'Fitzer',
        email: 'rfitzer2@wordpress.org',
        username: 'rfitzer2',
        phone: '304-628-9771',
        role: 'Project Manager',
        status: true,
        createdAt: '6/6/2023',
        updatedAt: '7/14/2023',
        avatar: 'https://robohash.org/teneturutdoloribus.png?size=100x100&set=set1',
    },
    {
        id: 4,
        first_name: 'Catlee',
        last_name: 'Paddock',
        email: 'cpaddock3@i2i.jp',
        username: 'cpaddock3',
        phone: '876-344-3901',
        role: 'Construction Manager',
        status: false,
        createdAt: '11/5/2023',
        updatedAt: '2/17/2023',
        avatar: 'https://robohash.org/sedenimdebitis.png?size=100x100&set=set1',
    },
    {
        id: 5,
        first_name: 'Phyllis',
        last_name: 'Freezor',
        email: 'pfreezor4@deliciousdays.com',
        username: 'pfreezor4',
        phone: '822-188-6866',
        role: 'Electrician',
        status: false,
        createdAt: '6/8/2023',
        updatedAt: '2/26/2023',
        avatar: 'https://robohash.org/porrocupiditateeos.png?size=100x100&set=set1',
    },
    {
        id: 6,
        first_name: 'Forrest',
        last_name: 'Noto',
        email: 'fnoto5@wp.com',
        username: 'fnoto5',
        phone: '633-678-8204',
        role: 'Supervisor',
        status: true,
        createdAt: '3/3/2023',
        updatedAt: '6/8/2023',
        avatar: 'https://robohash.org/ipsaconsequaturincidunt.png?size=100x100&set=set1',
    },
    {
        id: 7,
        first_name: 'Eran',
        last_name: 'Dimitriou',
        email: 'edimitriou6@barnesandnoble.com',
        username: 'edimitriou6',
        phone: '321-343-3887',
        role: 'Construction Foreman',
        status: true,
        createdAt: '6/9/2023',
        updatedAt: '6/3/2023',
        avatar: 'https://robohash.org/temporeperferendisnon.png?size=100x100&set=set1',
    },
    {
        id: 8,
        first_name: 'Ronica',
        last_name: 'Tillett',
        email: 'rtillett7@cnn.com',
        username: 'rtillett7',
        phone: '881-622-7202',
        role: 'Electrician',
        status: false,
        createdAt: '7/13/2023',
        updatedAt: '9/12/2023',
        avatar: 'https://robohash.org/eligendidoloreveniet.png?size=100x100&set=set1',
    },
    {
        id: 9,
        first_name: 'Beryle',
        last_name: 'Iacivelli',
        email: 'biacivelli8@4shared.com',
        username: 'biacivelli8',
        phone: '515-493-2192',
        role: 'Construction Manager',
        status: true,
        createdAt: '12/23/2022',
        updatedAt: '6/20/2023',
        avatar: 'https://robohash.org/quiaetenim.png?size=100x100&set=set1',
    },
    {
        id: 10,
        first_name: 'Eddie',
        last_name: 'Burrells',
        email: 'eburrells9@walmart.com',
        username: 'eburrells9',
        phone: '930-469-2908',
        role: 'Construction Worker',
        status: true,
        createdAt: '5/13/2023',
        updatedAt: '7/22/2023',
        avatar: 'https://robohash.org/evenietmagnamnemo.png?size=100x100&set=set1',
    },
];

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
    const [selectedRoles, setSelectedRoles] = useState<Selection>(new Set([])); //State for roles selection filter
    const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set([])); // State for status selection filter
    const [rowsPerPage, setRowsPerPage] = useState('5'); // State for rows per page

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

            <div className="mt-10">
                <Card shadow="sm">
                    <CardBody className="w-full overflow-hidden sm:py-6">
                        <div className="flex w-full flex-col items-center justify-between gap-x-6 gap-y-2 md:flex-row">
                            <div className="w-full flex-grow md:w-auto">
                                <TableSearch />
                            </div>

                            <div className="flex w-full items-center justify-between gap-2 md:w-max">
                                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                                <RolesFilter selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                            </div>
                        </div>

                        <div className="mt-6">
                            <UsersTable usersData={usersData} />
                        </div>

                        <div className="px-4 pt-4">
                            <div className="flex items-center justify-between">
                                <Pagination total={5} initialPage={1} showControls size="sm" />
                                <TableRowsControl rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

UsersPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default UsersPage;
