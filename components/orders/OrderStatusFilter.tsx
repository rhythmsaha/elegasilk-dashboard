import { OrderStatusType } from '@/sections/orders/OrdersSection';
import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForward } from 'react-icons/io5';

interface Props {
    selectedStatus: string | undefined | null;
    onSelectedStatusChange: (status: OrderStatusType) => void;
}

const orderStatus = {
    all: undefined,
    pending: 'PLACED',
    cancelled: 'CANCELLED',
    delivered: 'DELIVERED',
    refunded: 'REFUNDED',
};

const OrderStatusFilter: React.FC<Props> = ({ selectedStatus, onSelectedStatusChange }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const element = scrollRef.current;
        if (!element) return;

        setCanScrollLeft(element.scrollLeft > 0);
        setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth);
    };

    const scroll = (scrollOffset: number) => {
        const element = scrollRef.current;
        if (!element) return;

        element.scrollLeft += scrollOffset;
        requestAnimationFrame(checkScroll);
    };

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        element.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
        return () => element.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <div>
            <div className="flex border-b">
                <button className={`flex h-10 w-10 items-center justify-center lg:hidden ${!canScrollLeft && 'invisible'}`} onClick={() => scroll(-120)}>
                    <IoChevronBackOutline />
                </button>

                <div ref={scrollRef} className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-hide">
                    {Object.keys(orderStatus).map((_status) => {
                        const isSelected = selectedStatus === orderStatus[_status as keyof typeof orderStatus];

                        const selectFilter = () => {
                            const key = orderStatus[_status as keyof typeof orderStatus] as OrderStatusType;
                            onSelectedStatusChange(key);
                        };

                        return (
                            <div onClick={selectFilter} key={_status} className={`cursor-pointer border-b-2 px-4 py-1 capitalize ${isSelected ? ' border-black' : 'border-transparent'} select-none`}>
                                {_status}
                            </div>
                        );
                    })}
                </div>

                <button className={`flex h-10 w-10 items-center justify-center lg:hidden ${!canScrollRight && 'invisible'}`} onClick={() => scroll(120)}>
                    <IoChevronForward />
                </button>
            </div>
        </div>
    );
};

export default OrderStatusFilter;
