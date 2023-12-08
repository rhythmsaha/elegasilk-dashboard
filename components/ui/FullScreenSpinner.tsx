import { Spinner } from '@nextui-org/react';
import React from 'react';

const FullScreenSpinner = () => {
    return (
        <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
            <Spinner />
        </div>
    );
};

export default FullScreenSpinner;
