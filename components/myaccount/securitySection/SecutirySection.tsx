import React from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import { Card, CardBody } from '@nextui-org/react';

const SecuritySection = () => {
    return (
        <div>
            <Card shadow="sm">
                <CardBody className="p-6">
                    <PasswordChangeForm />
                </CardBody>
            </Card>
        </div>
    );
};

export default SecuritySection;
