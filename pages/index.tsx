import DashboardLayout from '@/components/layouts/DashboardLayout';

import Head from 'next/head';

const data = [
    { name: 'Cereopsis goose', uv: 10, pv: 71, amt: 59 },
    { name: 'Bobcat', uv: 41, pv: 49, amt: 13 },
    { name: 'Two-toed tree sloth', uv: 35, pv: 40, amt: 30 },
    { name: 'Mountain duck', uv: 51, pv: 64, amt: 83 },
    { name: 'Hyena, striped', uv: 49, pv: 10, amt: 23 },
    { name: 'American woodcock', uv: 36, pv: 80, amt: 62 },
    { name: 'Fairy penguin', uv: 62, pv: 66, amt: 79 },
    { name: 'Long-tailed spotted cat', uv: 69, pv: 79, amt: 63 },
    { name: 'Pelican, australian', uv: 91, pv: 53, amt: 54 },
    { name: 'Radiated tortoise', uv: 148, pv: 20, amt: 91 },
    { name: 'Radiated tortoise', uv: 35, pv: 20, amt: 91 },
    { name: 'Radiated tortoise', uv: 51, pv: 20, amt: 91 },
    { name: 'Radiated tortoise', uv: 49, pv: 20, amt: 91 },
];

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
