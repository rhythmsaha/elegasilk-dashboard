import DashboardLayout from '@/components/layouts/DashboardLayout';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Dashboard | Elegasilk</title>
            </Head>

            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Praesentium neque cum minima vel consequatur unde ea quibusdam
                nulla, saepe, quisquam velit iusto omnis sequi dicta repudiandae
                modi eius, odit aliquid.
            </div>
        </>
    );
}

Home.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
