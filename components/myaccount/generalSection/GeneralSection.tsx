import { IUserAccount } from '@/Typings';
import { Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import React, { FC } from 'react';
import GeneralForm from './GeneralForm';

interface Props {
    user?: IUserAccount;
}

const GeneralSection: FC<Props> = ({}) => {
    return (
        <div className="grid gap-5 lg:grid-cols-3">
            <Card shadow="sm" className="lg:col-span-1">
                <CardBody className="p-6">
                    {/* Avatar Comp */}
                    {/* Delete User Button */}
                </CardBody>
            </Card>

            <Card shadow="sm" className="lg:col-span-2">
                <CardBody className="p-6">
                    <GeneralForm />
                </CardBody>
            </Card>
        </div>
    );
};

export default GeneralSection;
