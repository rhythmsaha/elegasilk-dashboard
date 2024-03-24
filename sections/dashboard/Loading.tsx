import React from 'react';
import { Card, CardBody, Skeleton } from '@nextui-org/react';

interface Props {}

const OrderCardLoading = () => {
    return (
        <Card className="">
            <CardBody className="">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                        <Skeleton className="h-6 w-1/3 rounded-lg" />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

const Loading: React.FC<Props> = (props) => {
    return (
        <div className="mt-10">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <OrderCardLoading />
                <OrderCardLoading />
                <OrderCardLoading />
                <OrderCardLoading />
            </section>

            <div className="mt-6 grid gap-4 lg:grid-cols-10">
                <Card shadow="sm" className="overflow-hidden lg:col-span-6">
                    <CardBody className="overflow-visible">
                        <Skeleton className="mt-4 h-4 w-3/12 rounded-lg lg:h-6" />
                        <Skeleton className="mt-4 h-80 rounded-lg " />
                    </CardBody>
                </Card>

                <Card shadow="sm" className="overflow-hidden  lg:col-span-4">
                    <CardBody className="overflow-visible">
                        <Skeleton className="mx-auto my-4 h-4 w-3/12 rounded-lg lg:h-6" />
                        <div className="mt-6 flex items-center justify-center">
                            <Skeleton className="aspect-square h-52 rounded-full" />
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-4">
                            <div>
                                <Skeleton className="mr-1 inline-block h-4 w-4 rounded-full" />
                                <Skeleton className="inline-block h-4 w-20 rounded-lg" />
                            </div>
                            <div>
                                <Skeleton className="mr-1 inline-block h-4 w-4 rounded-full" />
                                <Skeleton className="inline-block h-4 w-20 rounded-lg" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <section className="mb-40 mt-10"></section>
        </div>
    );
};

export default Loading;
