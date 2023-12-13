import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import useCollection from '@/hooks/collections/useCollection';
import { NextPageWithLayout } from '@/pages/_app';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const EditCollectionPage: NextPageWithLayout = () => {
    const { collection, error, getCollection, isLoading } = useCollection();
    const router = useRouter();

    useEffect(() => {
        getCollection(router.query.slug as string);
    }, [getCollection, router.query.slug]);

    console.log();

    if (!collection && isLoading) {
        return (
            <div className="fullscreen-center">
                <Spinner />
            </div>
        );
    }

    // if (error) {
    //     router.push('/404');
    // }

    if (!collection || error) {
        return (
            <div className="fullscreen-center">
                <h3 className="text-2xl font-bold md:text-6xl">404 Not Found</h3>
            </div>
        );
    }

    return (
        <div className="dashboard-xl">
            <PageName
                title={`Edit Collection`}
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Collections', href: '/collections' },
                    { title: 'Edit Collection', href: router.asPath },
                ]}
            />
        </div>
    );
};

EditCollectionPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default EditCollectionPage;
