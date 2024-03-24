import TopCard from '@/components/dashboard/TopCard';
import { GoStack, GoSync } from 'react-icons/go';
import React, { useCallback, useEffect, useState } from 'react';
import { PiCurrencyInrBold, PiCurrencyInrFill } from 'react-icons/pi';
import { IoCheckmarkDone, IoTodayOutline } from 'react-icons/io5';
import { MdCalendarMonth, MdOutlineShoppingCart } from 'react-icons/md';
import OrdersCard from '@/components/dashboard/OrdersCard';
import PageName from '@/components/ui/PageName';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaSyncAlt } from 'react-icons/fa';
import { BiSync } from 'react-icons/bi';
import OrdersSection from '../orders/OrdersSection';
import Chart from '@/components/ui/Chart';
import { Card, CardBody } from '@nextui-org/react';
import Loading from './Loading';
import { GraphData, ISalesAndOrderReport } from '@/Typings';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import RadialChart from '@/components/dashboard/RadialChart';
import WeeklySales from '@/components/dashboard/WeeklySales';

interface Props {}

const state: {
    series: { name: string; data: number[] }[];
    options: ApexCharts.ApexOptions;
} = {
    series: [
        {
            name: 'Sales',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
    ],

    options: {
        colors: ['#00A76F'],
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            foreColor: '#919EAB',
            fontFamily: 'Public Sans, sans-serif',
        },

        fill: {
            opacity: 1,
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100],
            },
        },

        dataLabels: { enabled: false },

        stroke: { width: 3, curve: 'smooth', lineCap: 'round' },

        grid: {
            strokeDashArray: 3,
            borderColor: 'rgba(145, 158, 171, 0.2)',
            xaxis: { lines: { show: false } },
        },

        xaxis: {
            type: 'datetime',
            axisBorder: { show: false },
            axisTicks: { show: false },
            categories: [
                '2018-01-19T00:00:00.000Z',
                '2018-02-19T01:30:00.000Z',
                '2018-03-19T02:30:00.000Z',
                '2018-04-19T03:30:00.000Z',
                '2018-05-19T04:30:00.000Z',
                '2018-06-19T05:30:00.000Z',
                '2018-07-19T06:30:00.000Z',
            ],
        },

        tooltip: {
            theme: 'light',
            x: { show: false, format: 'dd/MM/yy' },
        },
    },
};

const DashboardSection: React.FC<Props> = (props) => {
    const [salesReport, setSalesReport] = useState<ISalesAndOrderReport>();
    const [graphData, setGraphData] = useState<GraphData>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchReport = useCallback(async () => {
        try {
            const res = await axios.get(API_URLS.dashboard.salesAndOrderReport);
            const res2 = await axios.get(API_URLS.dashboard.graphData);
            const data = res.data;
            const data2 = res2.data;

            if (!data.success) throw new Error('Failed to fetch data');
            setSalesReport(data.report);

            if (!data2.success) throw new Error('Failed to fetch data');
            setGraphData(data2.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="mt-10">
            {salesReport?.salesData && (
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <TopCard Icon={IoTodayOutline} heading="Today Sales" value={salesReport.salesData.today.sales} color="#0d9488" />
                    <TopCard Icon={GoStack} heading="Yesterday Sales" value={salesReport.salesData.yesterday.sales} color="#fb923c" />
                    <TopCard Icon={MdCalendarMonth} heading="This Month" value={salesReport.salesData.thisMonth.sales} color="#3b82f6" />
                    <TopCard Icon={PiCurrencyInrBold} heading="Total Sales" value={salesReport.salesData.total.sales} color="#0891b2" />
                </section>
            )}

            {salesReport?.ordersData && (
                <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <OrdersCard Icon={MdOutlineShoppingCart} heading="Total Orders" value={salesReport.ordersData.total} color="#ea580c" />
                    <OrdersCard Icon={BiSync} heading="Pending Orders" value={salesReport.ordersData.placed} color="#2563eb" />
                    <OrdersCard Icon={TbTruckDelivery} heading="Shipped Orders" value={salesReport.ordersData.shipped} color="#0d9488" />
                    <OrdersCard Icon={IoCheckmarkDone} heading="Delivered Orders" value={salesReport.ordersData.delivered} color="#059669" />
                </section>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-10">
                {graphData && <WeeklySales weeklySales={graphData.area} />}

                {graphData && <RadialChart radial={graphData.radial} />}
            </div>
            <section className="mb-40 mt-10">
                <div className="">
                    <h2 className="-mb-8 text-lg font-semibold text-gray-600">Recent Orders</h2>
                    <OrdersSection />
                </div>
            </section>
        </div>
    );
};

export default DashboardSection;
