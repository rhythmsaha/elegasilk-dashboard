import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import Chart from '../ui/Chart';
import { GraphRadialData } from '@/Typings';

interface Props {
    radial: GraphRadialData;
}

const RadialChart: React.FC<Props> = ({ radial }) => {
    const salesQtyPercent = (radial.salesQuantity / (radial.salesQuantity + radial.returnsQuantity)) * 100;
    const returnsQtyPercent = (radial.returnsQuantity / (radial.salesQuantity + radial.returnsQuantity)) * 100;

    const series = [salesQtyPercent, returnsQtyPercent];

    let options: ApexCharts.ApexOptions = {
        colors: ['#00A76F', '#FFAB00'],
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            foreColor: '#919EAB',
            fontFamily: 'Public Sans, sans-serif',
            sparkline: {
                enabled: true,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.04,
                },
            },
            active: {
                filter: {
                    type: 'darken',
                    value: 0.88,
                },
            },
        },

        stroke: {
            width: 3,
            curve: 'smooth',
            lineCap: 'round',
        },

        legend: {
            show: true,
            fontSize: '13',
            position: 'bottom',
            horizontalAlign: 'center',
            markers: {
                radius: 12,
            },
            fontWeight: 500,
            itemMargin: {
                horizontal: 8,
            },
            labels: {
                colors: '#212B36',
            },
        },

        plotOptions: {
            radialBar: {
                track: {
                    strokeWidth: '100%',
                    background: 'rgba(145, 158, 171, 0.16)',
                },

                hollow: {
                    size: '50%',
                },

                dataLabels: {
                    name: {
                        fontSize: '1rem',
                    },
                    value: {
                        fontSize: '1rem%',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (opts: any) {
                            return (radial.returnsQuantity + radial.salesQuantity).toString();
                        },
                    },
                },
            },
        },

        labels: ['Sales', 'Return'],
    };

    return (
        <Card shadow="sm" className="overflow-hidden  lg:col-span-4">
            <CardBody className="overflow-visible">
                <h4 className="px-4 pt-4 text-center text-lg font-bold text-gray-600 lg:px-6">Monthly Sales and Returns</h4>
                <Chart options={options} series={series} type="radialBar" height={350} />
            </CardBody>
        </Card>
    );
};

export default RadialChart;
