import DashboardLayout from '@/components/layouts/DashboardLayout';
import Head from 'next/head';
import DashboardSection from '@/sections/dashboard/DashboardSection';
import PageName from '@/components/ui/PageName';
import 'react-day-picker/dist/style.css';

export default function Home() {
    return (
        <div className="mx-auto w-11/12 max-w-screen-2xl">
            <Head>
                <title>Dashboard | Elegasilk</title>
            </Head>

            <PageName title="Dashboard" />
            <DashboardSection />
        </div>
    );
}

Home.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
