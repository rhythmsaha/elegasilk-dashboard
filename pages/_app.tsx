import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/providers/AuthProvider';
import '@/styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <AuthProvider>
            <NextUIProvider>
                {getLayout(<Component {...pageProps} />)}
            </NextUIProvider>

            <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
    );
}
