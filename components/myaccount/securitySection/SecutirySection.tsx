import React from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import { Card, CardBody } from '@nextui-org/react';

export interface IChangePasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const SecuritySection = () => {
    return (
        <Card shadow="sm">
            <CardBody className="sm:p-6">
                <PasswordChangeForm />
            </CardBody>
        </Card>
    );
};

export default SecuritySection;
