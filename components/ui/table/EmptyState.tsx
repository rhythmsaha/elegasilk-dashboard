import { Image } from '@nextui-org/react';
import React, { FC } from 'react';

type Props = {
    message?: string;
    image?: string;
};

const EmptyState: FC<Props> = ({ message = 'No Data', image = '/images/empty.svg' }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl bg-default-50 py-10">
            <Image src={image} alt="empty" className="mx-auto w-32 sm:w-48" />
            <h4 className="text-center font-semibold text-default-500 sm:text-lg">{message}</h4>
        </div>
    );
};

export default EmptyState;
