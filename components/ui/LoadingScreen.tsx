import { Spinner } from '@nextui-org/react';
import React from 'react';

type Props = {};

const LoadingScreen = (props: Props) => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner size="lg" color="default" className="" />
        </div>
    );
};

export default LoadingScreen;
