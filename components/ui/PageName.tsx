import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC } from 'react';

export interface INavLink {
    title: string;
    href: string;
}

interface Props {
    title: string;
    breadcrumb: INavLink[];
    Button?: React.ElementType;
}

const Separator = () => <span className="mx-2">•</span>;

const PageName: FC<Props> = ({ title, breadcrumb, Button }) => {
    return (
        <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
                <h2 className="text-xl font-semibold md:text-2xl md:font-bold">{title}</h2>

                {breadcrumb && (
                    <div className="mt-2">
                        <Breadcrumbs separator={<Separator />}>
                            {breadcrumb.map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    <Link href={item.href}>{item.title}</Link>
                                </BreadcrumbItem>
                            ))}
                        </Breadcrumbs>
                    </div>
                )}
            </div>

            {Button && <Button />}
        </section>
    );
};

export default PageName;
