import React from 'react';
import Chart from '../ui/Chart';
import { Card, CardBody } from '@nextui-org/react';
import { GraphSalesData } from '@/Typings';

interface Props {
    weeklySales: GraphSalesData[];
}

const WeeklySales: React.FC<Props> = ({ weeklySales }) => {
    const seriesArr = weeklySales.map((item) => {
        return item.sales;
    });

    const dateArr = weeklySales.map((item) => {
        console.log(new Date(item.date).toISOString());

        return new Date(item.date).toISOString();
    });

    const series: { name: string; data: number[] }[] = [
        {
            name: 'Sales',
            data: seriesArr,
        },
    ];

    console.log(weeklySales);

    const options: ApexCharts.ApexOptions = {
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
            axisTicks: { show: true },
            categories: [...dateArr],
        },

        tooltip: {
            theme: 'light',
            x: { show: false, format: 'dd/MM/yy' },
        },
    };

    return (
        <Card shadow="sm" className="overflow-hidden lg:col-span-6">
            <CardBody className="overflow-visible">
                <h4 className="p-4  text-lg font-bold text-gray-600 lg:p-6">Weekly Sales</h4>
                <Chart options={options} series={series} type="area" height={350} />
            </CardBody>
        </Card>
    );
};

export default WeeklySales;
