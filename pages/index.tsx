import DashboardLayout from '@/components/layouts/DashboardLayout';
import Head from 'next/head';
import { faker } from '@faker-js/faker';
import { IUserRoles } from '@/Typings';

export default function Home() {
    return (
        <>
            <Head>
                <title>Dashboard | Elegasilk</title>
            </Head>

            <div>
                <div className="mx-10 my-10 rounded-xl border p-10 shadow"></div>
            </div>
        </>
    );
}

Home.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
