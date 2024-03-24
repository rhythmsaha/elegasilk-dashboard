import TopCard from '@/components/dashboard/TopCard';
import { GoStack, GoSync } from 'react-icons/go';
import React from 'react';
import { PiCurrencyInrBold, PiCurrencyInrFill } from 'react-icons/pi';
import { IoCheckmarkDone, IoTodayOutline } from 'react-icons/io5';
import { MdCalendarMonth, MdOutlineShoppingCart } from 'react-icons/md';
import OrdersCard from '@/components/dashboard/OrdersCard';
import PageName from '@/components/ui/PageName';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaSyncAlt } from 'react-icons/fa';
import { BiSync } from 'react-icons/bi';
import OrdersSection from '../orders/OrdersSection';

interface Props {}

const DashboardSection: React.FC<Props> = (props) => {
    return (
        <div className="mt-10">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TopCard Icon={IoTodayOutline} heading="Today Sales" value={568900} color="#0d9488" />
                <TopCard Icon={GoStack} heading="Yesterday Sales" value={56809} color="#fb923c" />
                <TopCard Icon={MdCalendarMonth} heading="This Month" value={56849} color="#3b82f6" />
                <TopCard Icon={PiCurrencyInrBold} heading="Total Sales" value={56989} color="#0891b2" />
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <OrdersCard Icon={MdOutlineShoppingCart} heading="Total Orders" value={568} color="#ea580c" />
                <OrdersCard Icon={BiSync} heading="Pending Orders" value={568} color="#2563eb" />
                <OrdersCard Icon={TbTruckDelivery} heading="Shipped Orders" value={568} color="#0d9488" />

                <OrdersCard Icon={IoCheckmarkDone} heading="Delivered Orders" value={568} color="#059669" />
            </section>

            <section className="mt-10">
                <h2 className="-mb-8 text-lg font-semibold text-gray-600">Recent Orders</h2>
                <OrdersSection />
            </section>
        </div>
    );
};

export default DashboardSection;
